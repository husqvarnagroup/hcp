/// <reference types="typescript" />

import { Completer, CompleterResult } from 'readline';
import * as util from 'util';
import * as fs from 'fs';

export type MethodParameter = {
    name: string;
    type: string | any,
    length?: number | string
}

export type CompiledMethodParameter = {
    tifParams : MethodParameter[],
    scriptParams : ObjectType
}

export type MethodBody = {
    command: string;
    family: string;
    inParams: MethodParameter[] | CompiledMethodParameter,
    outParams: MethodParameter[] | CompiledMethodParameter,
    path?: string; // use for compiling
};

export type ModelBody = {
    header?: {},
    types?: any[],
    methods: MethodBody[]
}

export type ObjectType = {
    name: string,
    types: any[],
    method: MethodBody,
    description: string
};

export class HcpModel {
    private _id: number;
    private _body: ModelBody;
    private _completer: Completer;
    private _build : string;

    constructor(id: number, body: ModelBody) {
        this._id = id;
        this._body = body;
        this._completer = null;
        this._build = null;
    }

    public get id() {
        return this._id;
    }

    public get completer() : Completer{
        if (this._completer == null) {
            // build the contents of the completer
            let completions: string[] = this._body.methods.map(
                (method) => method.family + '.' + method.command);

            this._completer = (line): any => {
                let hits = completions.filter((c) => c.indexOf(line) == 0);
                return [hits.length ? hits : completions, line];
            }
        }

        return this._completer;
    }
    /**
     * Compiles the model into a typescript file.
     */
    public compile() : string {
        if(!this._build) {
            let compiler = new HcpModelCompiler();
            this._build = compiler.compile(this._body);
        }

        return this._build;
    }
    /**
     * Compiles the model into a typescript file and stores the result to disc.
     */
    public compileTo(outFile : string) : void {
        let build = this.compile();
        fs.writeFileSync(outFile, build);
    }
}

class HcpModelCompiler {

    private _methods = {};
    private _enums = {};
    private _types = {};
    private _errors = [];
    private _objects = [];
    private _namespaces = [];

    constructor() {
        this._methods = {};
        this._enums = {};
        this._types = {};
        this._errors = [];
        this._objects = [];
        this._namespaces = [];
    }
    /**
     * Clears the compilers internal state.
     */
    private clear() {
        this._methods = [];
        this._errors = [];
        this._objects = [];
        this._enums = {};
        this._types = {};
    }
    /**
     * Returns the corresponding node-type from a model-parameter type.
     */
    private getScriptType(type: string): any {
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
    /**
     * Extracts the types section from a model.
     */
    private extractTypes(body: ModelBody): void {
        if (!body || !util.isArray(body.types)) {
            return;
        }

        body.types.forEach((type, index) => {
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
    /**
     * Checks if a parameter name is valid.
     */
    private verifyParameterName(name): boolean {
        if (!name || !util.isString(name) || name == '') {
            return false;
        }

        return true;
    }
    /**
     * Extracts the types from a parameter array.
     */
    private resolveParameterTypes(parameters: MethodParameter[], method: MethodBody): void {
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
    /**
     * Extracts the object-style object- types
     */
    private extractObjectTypes(parameters: MethodParameter[], prefix: string, method: MethodBody, description: string) : ObjectType{
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
                size: util.isString(p.length) ? parseInt(p.length as string) : p.length,
                source: p
            });
        });

        if (this._objects.find((item) => {
            return item.name == result.name;
        })) {
            return;
        }

        this._objects.push(result);
        return result;
    }
    /**
     * Extacts the methods from a body, adding them to the compiler state.
     */
    private extractMethods(body : ModelBody) : void {
        if (!body || !util.isArray(body.methods)) {
            return;
        }

        body.methods.forEach((method) => {
            if (!util.isString(method.family) || method.family.length < 1) {
                return;
            }

            if (!util.isString(method.command) || method.command.length < 1) {
                return;
            }

            this._methods[method.family] = this._methods[method.family] || {};
            this._methods[method.family][method.command] = method;

            method.path = method.family + '.' + method.command;

            this.resolveParameterTypes(method.inParams as MethodParameter[], method);
            this.resolveParameterTypes(method.outParams as MethodParameter[], method);

            method.inParams = {
                tifParams: method.inParams as MethodParameter[],
                scriptParams: this.extractObjectTypes(method.inParams as MethodParameter[], 'tIn', method, 'Input object for ' + method.family + '.' + method.command)
            };

            method.outParams = {
                tifParams: method.outParams as MethodParameter[],
                scriptParams: this.extractObjectTypes(method.outParams as MethodParameter[], 'tOut', method, 'Output object for ' + method.family + '.' + method.command)
            };
        });
    }
    /**
     * Writes the types section of the compiled model.
     */
    private writeTypes() : string {
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
    /**
     * Writes the objects associated with a method.
     */
    private writeObjects(parameters : CompiledMethodParameter, prefix : string, method : MethodBody, description : string) : string{
        let objectName = prefix + method.command;

        return parameters.tifParams.reduce((prev, curr, index, array) => {
            prev += '\n\t\t' + curr.name + ': ';

            if (!this.getScriptType(curr.type.tifType)) {
                return prev + curr.type.tifType;
            } else {
                return prev + curr.type.scriptType.name;
            }

        }, '\t/**\n\t *  ' + description + '\n\t */\n\texport type ' + objectName + ' = {') + '\n\t}\n';
    }
    /**
     * Returns the body section of the compiled model as a string.
     */
    private writeBody(method : MethodBody, returnType, string, runArgs : string) : string {
        let request = method.family + '.' + method.command;

        request += '(' + (method.inParams as CompiledMethodParameter) .tifParams.reduce((prev, curr, index, array) => {
            prev += "" + curr.name + ": ' + __args." + curr.name + "+ '";

            if (index + 1 < array.length) {
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
    /**
     * Returns the methods section of the compiled model as a string.
     */
    private writeMethods() : string {
        let result = '';

        for (let family in this._methods) {
            result += '\nexport namespace ' + family + ' {\n';

            let objects = '';
            let methods = '';

            // write objects
            for (let command in this._methods[family]) {
                let method : MethodBody = this._methods[family][command];

                if ((method.outParams as CompiledMethodParameter).tifParams.length > 1) {
                    objects += this.writeObjects((method.outParams as CompiledMethodParameter), 'tOut', method, 'Output type for ' + method.family + '.' + method.command);
                }

                let returnType = '';

                if ((method.outParams as CompiledMethodParameter).tifParams.length > 1) {
                    returnType = 'tOut' + method.command;
                } else if ((method.outParams as CompiledMethodParameter).tifParams.length == 1) {
                    returnType = (method.outParams as CompiledMethodParameter).tifParams[0].type.scriptType.name;
                } else {
                    returnType = 'void';
                }

                let header = '\n\texport function ' + method.command;
                let runArgs = '{}';
                
                if ((method.inParams as CompiledMethodParameter).tifParams.length == 0) {
                    methods += header + '(handle : any): ';

                    methods += 'Promise<' + returnType + '>';
                    methods += ' {' + this.writeBody(method, returnType, runArgs) + '\t}\n';
                } else {
                    objects += this.writeObjects(method.inParams as CompiledMethodParameter, 'tIn', method, 'Input type for ' + method.family + '.' + method.command);

                    methods += header + 'I(handle : any, args : tIn' + method.command + '): ';
                    methods += 'Promise<' + returnType + '>';
                    methods += ' {' + this.writeBody(method, returnType, 'args') + '\t}\n';

                    runArgs = '{\n';

                    methods += header + (method.inParams as CompiledMethodParameter).tifParams.reduce((prev, curr, index, array) => {

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

            result += objects + methods + '}\n';
        }

        return result;
    }

    /**
     * Compiles a model into a type-script string.
     */
    public compile(body : ModelBody) : string{
        this.extractTypes(body);
        this.extractMethods(body);

        let script = this.writeTypes();
        script += this.writeMethods();

        // reset internal state
        this.clear();

        return script;
    }
}