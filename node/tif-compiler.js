'use strict';

const util = require('util');

class TifCompiler {
    constructor() {
        this._methods = {};
        this._enums = {};
        this._types = {};
        this._errors = [];
        this._interfaces = [];
        this._namespaces = [];
    }

    clear() {
        this._methods.clear();
        this._errors.clear();
        this._interfaces.clear();

        this._enums = {};
        this._types = {};
    }

    getScriptType(type) {
        if (!type || !util.isString(type)) {
            return null;
        }

        switch (type) {
            case "uint8":
            case "sint8":
            case "uint16":
            case "sint16":
            case "uint32":
            case "sint32":
            case "uint64":
            case "sint64":
            case "double":
            case "float": {
                return Number;
            }
            case "tUnixTime": {
                return Date;
            }
            case "byteArray": {
                return Uint8Array;
            }
            case "tSimpleVersion": {
                return Number;
            }
            case "bool": {
                return Boolean;
            }
            case "ascii": {
                return String;
            }
            default: {
                return null;
            }
        }
    }

    extractTypes(doc) {
        if (!doc || !util.isArray(doc.types)) {
            return;
        }

        doc.types.forEach((type, index) => {
            if (!util.isString(type.name) || type.name.length < 1) {
                return;
            }

            let scriptType = this.getScriptType(type.type);

            type.type = {
                source: type.type,
                tifType: type.type,
                scriptType: scriptType,
                resolved: scriptType != null,
                basicType: scriptType != null
            };

            this._types[type.name] = type;

            if (type.enums && util.isArray(type.enums) && type.enums.length > 0) {
                type.enums.forEach((e) => {
                    if (!util.isString(e.key) || e.key.length < 1) {
                        return;
                    }

                    let scriptType = this.getScriptType(e.type);

                    e.type = {
                        source: e.source,
                        tifType: e.type,
                        scriptType: scriptType || e.type,
                        resolved: scriptType != null,
                        basicType: scriptType != null,
                        type: type
                    };

                    this._enums[e.key] = e;
                });
            }
        });

        // resolve nested types
        let queue = [];

        for (let key in this._types) {
            queue.push(key);
        }

        while (queue.length > 0) {
            let key = queue.pop();
            let e = this._types[key];

            if (e.type.resolved === true) {
                continue;
            }

            let tifType = this._types[e.type.tifType];

            if (!tifType || tifType == null) {
                continue;
            }

            e.type.scriptType = tifType;

            let scriptType = this.getScriptType(tifType.type.tifType);
            e.type.resolved = scriptType != null;
            e.type.scriptType = scriptType;
            e.type.tifType = tifType.type.tifType;

            if (e.type.resolved === false && queue.length > 0 && e.type.tifType) {
                queue.push(key);
            }
        }
    }

    //var uint8array = new TextEncoder("utf-8").encode("¢");
    //var string = new TextDecoder("utf-8").decode(uint8array);

    verifyParameterName(name) {
        if (!name || !util.isString(name) || name == '') {
            return false;
        }

        return true;
    }

    resolveParameterTypes(parameters, method) {
        if (!parameters || !util.isArray(parameters)) {
            return;
        }

        parameters.forEach((p) => {
            if (!this.verifyParameterName(p.name)) {
                this._errors.push(new Error(p.name + ' is not a valid parameter name, at ' + method.path));
                return;
            }

            let scriptType = this.getScriptType(p.type);

            if (scriptType == null && this._types[p.type]) {
                scriptType = this._types[p.type].type.scriptType;
            }

            if (!scriptType || scriptType == null) {
                this._errors.push(new Error('Type ' + (p.type || 'null') + ' for parameter + ' + p.name + ' could not be resolved into a basic type, at ' + method.path));
            } else {
                p.type = {
                    tifType: p.type,
                    scriptType: scriptType
                }
            }
        });
    }

    extractInterfaces(parameters, prefix, method, description) {
        if (!parameters || !util.isArray(parameters)) {
            this._errors.push(new Error('Parameter property on ' + method.path + ' was not an array.'));
            return null;
        }

        if (parameters.length < 2) {
            return null;
        }

        let result = {
            name: prefix + method.family + method.command,
            types: [],
            method: method,
            description: description
        };

        parameters.forEach((p) => {
            result.types.push({
                name: p.name,
                type: p.type.scriptType,
                size: parseInt(p.length),
                source: p
            });
        });

        if (this._interfaces.find((item) => {
            return item.name == result.name;
        })) {
            return;
        }

        this._interfaces.push(result);
        return result;
    }

    extractMethods(doc) {
        if (!doc || !util.isArray(doc.methods)) {
            return;
        }

        doc.methods.forEach((method) => {
            if (!util.isString(method.family) || method.family.length < 1) {
                return;
            }

            if (!util.isString(method.command) || method.command.length < 1) {
                return;
            }

            this._methods[method.family] = this._methods[method.family] || {};
            this._methods[method.family][method.command] = method;

            method.path = method.family + '.' + method.command;

            this.resolveParameterTypes(method.inParams, method);
            this.resolveParameterTypes(method.outParams, method);

            method.inParams = {
                tifParams: method.inParams,
                scriptParams: this.extractInterfaces(method.inParams, 'tIn', method, 'Input interface for ' + method.family + '.' + method.command)
            };

            method.outParams = {
                tifParams: method.outParams,
                scriptParams: this.extractInterfaces(method.outParams, 'tOut', method, 'Output interface for ' + method.family + '.' + method.command)
            };
        });
    }

    writeTypes() {
        let typesBlock = '';
        let enumsBlock = '';

        for (let key in this._types) {
            let type = this._types[key];

            if (util.isArray(type.enums) && type.enums.length > 0) {
                enumsBlock += type.enums.reduce((prev, curr, index, array) => {
                    if (curr.description && curr.description != '') {
                        prev += '\t/** ' + curr.description + ' */\n';
                    }

                    prev += '\t' + curr.key + ' = ' + curr.value;

                    if (index + 1 < array.length) {
                        prev += ',';
                    }
                    return prev + '\n';

                }, 'enum ' + key + ' {\n');

                enumsBlock += '}\n\n';
            } else {
                if (type.description && type.description != '') {
                    typesBlock += '/** ' + type.description + ' */\n';
                }

                typesBlock += 'type ' + key + ' = ';

                if (type.type.basicType) {
                    typesBlock += type.type.scriptType.name;
                } else {
                    typesBlock += type.type.source;
                }

                typesBlock += ';\n';
            }
        }

        return typesBlock + '\n\n' + enumsBlock + '\n';
    }

    writeInterface(parameters, prefix, method, description) {
        let interfaceName = prefix + method.command;

        return parameters.tifParams.reduce((prev, curr, index, array) => {
            prev += '\n\t\t' + curr.name + ': ';

            if (!this.getScriptType(curr.type.tifType)) {
                return prev + curr.type.tifType;
            } else {
                return prev + curr.type.scriptType.name;
            }

        }, '\t/**\n\t *  ' + description + '\n\t */\n\texport interface ' + interfaceName + ' {') + '\n\t}\n';
    }

    writeBody(method, returnType, runArgs) {
        let request = method.family + '.' + method.command;

        request += '(' + method.inParams.tifParams.reduce((prev, curr, index, array) => {
            prev += "" + curr.name + ": ' + __args." + curr.name + "+ '";
            
            if(index + 1 < array.length) {
                return prev + ',';
            }
            
            return prev;
        }, '') + ')';

        let response = util.format('\n\t\tlet __args = %s;\n', runArgs);
        response += "\n\t\t\if(!handle.codec || typeof(handle.codec) != 'object') { handle = { codec : handle,timeout : 0};}\n"; 
       
        response += util.format("\n\t\ttry {\n\t\t\treturn handle.codec.send('%s', handle.timeout);\n\t\t} catch(error) {\n\t\t" +
            '\treturn new Promise<%s>((res,reject) => { reject(error);\});\n\t\t}\n', request, returnType);

        return response;
    }

    writeMethods() {
        let result = '';

        for (let family in this._methods) {
            result += '\nexport namespace ' + family + ' {\n';

            let interfaces = '';
            let methods = '';

            // write interfaces
            for (let command in this._methods[family]) {
                let method = this._methods[family][command];

                if (method.outParams.tifParams.length > 1) {
                    interfaces += this.writeInterface(method.outParams, 'tOut', method, 'Output interface for ' + method.family + '.' + method.command);
                }

                let returnType = '';

                if (method.outParams.tifParams.length > 1) {
                    returnType = 'tOut' + method.command;
                } else if (method.outParams.tifParams.length == 1) {
                    returnType = method.outParams.tifParams[0].type.scriptType.name;
                } else {
                    returnType = 'void';
                }
                
                let header = '\n\texport function ' + method.command;
                let runArgs = '{}';

                if (method.inParams.tifParams.length == 0) {
                     methods += header + '(handle : any): ';
                     
                     methods += 'Promise<' + returnType + '>';
                     methods += ' {' + this.writeBody(method, returnType,runArgs) + '\t}\n';
                } else {
                    interfaces += this.writeInterface(method.inParams, 'tIn', method, 'Input interface for ' + method.family + '.' + method.command);

                    methods += header + 'I(handle : any, args : tIn' + method.command + '): ';
                    methods += 'Promise<' + returnType + '>';
                    methods += ' {' + this.writeBody(method, returnType, 'args') + '\t}\n';
                    
                    runArgs = '{\n';
                    
                    methods += header + method.inParams.tifParams.reduce((prev, curr, index, array) => {
                        
                            if (!this.getScriptType(curr.type.tifType)) {
                                prev += curr.name + ': ' + curr.type.tifType;
                                
                            } else {
                                prev += curr.name + ': ' + curr.type.scriptType.name;
                            }
                            
                            runArgs += '\t\t\t\t' + curr.name + ': ' + curr.name;

                            if (index + 1 < array.length) {
                                runArgs += ',\n'
                                return prev + ', ';
                            }

                            return prev + '): '
                        }, '(handle : any, ');
                        
                    runArgs += '\n\t\t}';
                    
                    methods += util.format('Promise<%s> {\n\t\treturn %sI(handle, %s);\n\t}\n', returnType, method.command, runArgs);
                }

            }

            result += interfaces + methods + '}\n';
        }

        return result;
    }


    static compile(doc) {
        let compiler = new TifCompiler();

        compiler.extractTypes(doc);
        compiler.extractMethods(doc);

        let script = compiler.writeTypes();
        script += compiler.writeMethods();

        return script;
    }
}

module.exports = TifCompiler.compile;