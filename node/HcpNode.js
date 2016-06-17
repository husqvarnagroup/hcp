"use strict";
const Hcp = require('./hcp');
const events_1 = require('events');
const util = require('util');
const hcp_log_1 = require('./hcp-log');
const hcp_codec_1 = require('./hcp-codec');
const hcp_model_1 = require('./hcp-model');
const pending_request_1 = require('./pending-request');
class HcpNode extends events_1.EventEmitter {
    constructor(log = new hcp_log_1.HcpLog()) {
        super();
        this._log = new hcp_log_1.HcpLog();
        this._models = new Array();
        this._codecs = new Array();
        this._relays = new Array();
    }
    get log() {
        return this._log;
    }
    /**
     * Initializes the Hcp binding, loading codec libraries from disc.
     * @param   codecPath   Relative or full path to codec libraries. Ex: './codecs'
     */
    init(codecPath, disableEncoding = false) {
        this._disableEncoding = disableEncoding;
        let run = (resolve, reject) => {
            if (!this._disableEncoding) {
                Hcp.init(codecPath);
            }
            resolve();
        };
        return new Promise((resolve, reject) => {
            setImmediate((self) => {
                try {
                    run.bind(self)(resolve, reject);
                }
                catch (error) {
                    reject(error);
                }
            }, this);
        });
    }
    /**
     * Returns an array of loaded codec libraries.
     */
    get libraries() {
        return Hcp.getLibraries();
    }
    /**
     * Parses a string into a JSON object and loads it into Hcp.
     * @param   model   TIF-model as a string that should be parsed as a JSON-structure.
     * @return  Returns a HcpModel object, representing the loaded model.
     */
    parseModel(model) {
        return this.loadModel(JSON.parse(model));
    }
    /**
     * Parses a string into a JSON object and loads it into Hcp.
     * @param   model   TIF-model object to be loaded.
     * @return  Returns a HcpModel object, representing the loaded model.
     */
    loadModel(model) {
        let id = 0;
        let copy = JSON.stringify(model);
        try {
            id = Hcp.loadModel(copy);
        }
        catch (error) {
            // logg
            throw error;
        }
        let result = new hcp_model_1.HcpModel(id, JSON.parse(copy));
        this._models.push(result);
        return result;
    }
    toArrayBuffer(buffer) {
        var ab = new ArrayBuffer(buffer.length);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buffer.length; ++i) {
            view[i] = buffer[i];
        }
        return ab;
    }
    decode(data, size, context) {
        let results = new Array();
        let run = (resolve, reject) => {
            if (!this._disableEncoding) {
                this._codecs.forEach((codec) => {
                    if (codec.context == context) {
                        let result = null;
                        try {
                            result = Hcp.decode(codec.id, this.toArrayBuffer(data), size);
                        }
                        catch (error) {
                            util.log(JSON.stringify(error));
                            return;
                        }
                        try {
                            codec.receive(result);
                        }
                        catch (error) {
                            util.log(JSON.stringify(error));
                        }
                        results.push(result);
                    }
                });
            }
            resolve(results);
        };
        return new Promise((resolve, reject) => {
            setImmediate((self) => {
                try {
                    run.bind(self)(resolve, reject);
                }
                catch (error) {
                    reject(error);
                }
            }, this);
        });
    }
    /**
     * Notifies codecs about a incoming result.
     * @param result Decoded device data.
     * @param context   Device context that codecs needs to be assocaited with
     *                  in order to receive the result.
     */
    receive(result, context) {
        let run = (resolve, reject) => {
            this._codecs.forEach((codec) => {
                if (codec.context == context) {
                    try {
                        codec.receive(result);
                    }
                    catch (error) {
                        util.log(JSON.stringify(error));
                    }
                }
            });
            resolve();
        };
        return new Promise((resolve, reject) => {
            setImmediate((self) => {
                try {
                    run.bind(self)(resolve, reject);
                }
                catch (error) {
                    reject(error);
                }
            }, this);
        });
    }
    send(request, timeout) {
        let run = (self, resolve, reject) => {
            if (!self._disableEncoding) {
                request.size = Hcp.encode(request.codec.id, request.request, request.data, request.size);
            }
            self._relays.forEach((relay) => {
                if (relay.ownsContext(request.context)) {
                    try {
                        relay.write(request);
                    }
                    catch (error) {
                        self.log.error(error, 'send', module.filename);
                    }
                }
            });
            self.emit('data', request);
            resolve(new pending_request_1.PendingRequest(request, timeout));
        };
        return new Promise((resolve, reject) => {
            let self = this;
            setImmediate(() => {
                try {
                    run(self, resolve, reject);
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    /**
     * Closes all codecs associated with a specific context.
     * @param context   Stream context.
     */
    closeContext(context) {
        this._codecs = this._codecs.map((codec) => {
            if (codec.context == context) {
                codec.close();
                return null;
            }
            return codec;
        }).filter((codec) => { return codec != null; });
    }
    addRelay(relay) {
        if (this._relays.indexOf(relay) > -1) {
            return;
        }
        let self = this;
        relay.on('data', (handle) => {
            try {
                self.decode(handle.data, handle.size, handle.context);
            }
            catch (error) {
                self.log.error(error, 'addRelay.relay.on.data', module.filename);
            }
        });
        relay.on('disconnect', (context) => {
            try {
                self.closeContext(context);
            }
            catch (error) {
                self.log.error(error, 'addRelay.relay.on.disconnect', module.filename);
            }
        });
        this._relays.push(relay);
    }
    /**
     * Creates a new codec instance using a pre-loaded TIF-model.
     * @param   library Name of the codec library to use when creating the new instance.
     * @param   model   Model to use when encoding and decoding data.
     * @param   context   Context that is associated with the codec and passed to events each time an event
     *                    is triggered by the codec. Use this to determine which code that is sending data.
     * @return  Returns a reference to the created codec instance.
     */
    createCodec(library, model, context) {
        if (this.libraries.indexOf(library) == -1) {
            throw new Error('The codec library ' + library + ' has not been loaded.');
        }
        if (this._models.indexOf(model) == -1) {
            throw new Error('Passed model has not been loaded via parseModel or loadModel and is therefor not loaded into native Hcp.');
        }
        let id = 0;
        try {
            id = Hcp.newCodec(library, model.id);
        }
        catch (error) {
            // logg
            throw error;
        }
        let result = new hcp_codec_1.HcpCodec(id, model, library, 1024, this.send, this.decode, context, this);
        this._codecs.push(result);
        return result;
    }
}
exports.HcpNode = HcpNode;
//# sourceMappingURL=HcpNode.js.map