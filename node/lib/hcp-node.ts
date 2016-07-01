import * as Hcp  from './hcp';
import {EventEmitter} from 'events';
import * as util from 'util';
import {StreamRelay} from './stream-relay';
import {HcpLog} from './hcp-log';
import {TifRequest} from './tif-request';
import {HcpCodec} from './hcp-codec';
import {HcpModel} from './hcp-model';
import {PendingRequest} from './pending-request';
import {HcpResult} from './hcp-result';
import {RequestRouter, ResponseRouter} from './hcp-routing';

export class HcpNode extends EventEmitter {

    private _path: string;
    private _models: Array<HcpModel>;
    private _codecs: Array<HcpCodec>;
    private _disableEncoding: boolean;
    private _relays: Array<StreamRelay>
    private _log : HcpLog;

    constructor(log : HcpLog = new HcpLog()) {
        super();

        this._log = new HcpLog();
        this._models = new Array<HcpModel>();
        this._codecs = new Array<HcpCodec>();
        this._relays = new Array<StreamRelay>();
    }

    protected get log() : HcpLog {
        return this._log;
    }
    /**
     * Initializes the Hcp binding, loading codec libraries from disc.
     * @param   codecPath   Relative or full path to codec libraries. Ex: './codecs'  
     */
    init(codecPath: string, disableEncoding: boolean = false): Promise<void> {
        this._disableEncoding = disableEncoding;

        let run = (resolve: Function, reject: Function) => {
            if (!this._disableEncoding) {
                Hcp.init(codecPath);
            }

            resolve();
        };

        return new Promise<void>((resolve: Function, reject: Function) => {
            setImmediate((self) => {
                try {
                    run.bind(self)(resolve, reject);
                } catch (error) {
                    reject(error);
                }

            }, this);
        });
    }
    /**
     * Returns an array of loaded codec libraries.
     */
    get libraries(): string {
        return Hcp.getLibraries();
    }
    /**
     * Parses a string into a JSON object and loads it into Hcp.
     * @param   model   TIF-model as a string that should be parsed as a JSON-structure.
     * @return  Returns a HcpModel object, representing the loaded model.
     */
    parseModel(model: string): HcpModel {
        return this.loadModel(JSON.parse(model));
    }
    /**
     * Parses a string into a JSON object and loads it into Hcp.
     * @param   model   TIF-model object to be loaded.
     * @return  Returns a HcpModel object, representing the loaded model.
     */
    loadModel(model: Object): HcpModel {
        let id = 0;
        let copy = JSON.stringify(model);
        try {
            id = Hcp.loadModel(copy);
        } catch (error) {
            // logg
            throw error;
        }

        let result = new HcpModel(id, JSON.parse(copy));
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

    decode(data: ArrayBuffer, size: number, context: any): Promise<Array<HcpResult>> {
        let results = new Array<HcpResult>();

        let run = (resolve, reject) => {
            if (!this._disableEncoding) {
                this._codecs.forEach((codec) => {
                    if (codec.context == context) {
                        let result = null;

                        try {
                            result = Hcp.decode(codec.id, this.toArrayBuffer(data), size);
                        } catch (error) {
                            util.log(JSON.stringify(error));
                            return;
                        }

                        try {
                            codec.receive(result);
                        } catch (error) {
                            util.log(JSON.stringify(error));
                        }

                        results.push(result);
                    }
                });
            }

            resolve(results);
        };

        return new Promise<Array<HcpResult>>((resolve, reject) => {
            setImmediate((self) => {
                try {
                    run.bind(self)(resolve, reject);
                } catch (error) {
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
    receive(result: HcpResult, context: any): Promise<void> {
        let run = (resolve, reject) => {
            this._codecs.forEach((codec) => {
                if (codec.context == context) {
                    try {
                        codec.receive(result);
                    } catch (error) {
                        util.log(JSON.stringify(error));
                    }
                }
            });

            resolve();
        };

        return new Promise<void>((resolve, reject) => {
            setImmediate((self) => {
                try {
                    run.bind(self)(resolve, reject);
                } catch (error) {
                    reject(error);
                }
            }, this);
        });
    }

    send(request: TifRequest, timeout: number): Promise<PendingRequest> {
        let run = (self : HcpNode, resolve, reject) => {
            if (!self._disableEncoding) {
                request.size = Hcp.encode(request.codec.id, request.request, request.data, request.size);
            }

            self._relays.forEach((relay) => {
                if(relay.ownsContext(request.context)) {
                    try {
                        relay.write(request);
                    } catch(error) {
                        self.log.error(error,'send', module.filename);
                    }
                }
            });

            self.emit('data', request);
            resolve(new PendingRequest(request, timeout));
        };

        return new Promise<PendingRequest>((resolve, reject) => {
            let self = this;

            setImmediate(() => {
                try {
                    run(self, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    /**
     * Closes all codecs associated with a specific context.
     * @param context   Stream context.
     */
    closeContext(context: any) {
        this._codecs = this._codecs.map((codec) => {
            if (codec.context == context) {
                codec.close();
                return null;
            }

            return codec;
        }).filter((codec) => { return codec != null; });
    }

    addRelay(relay: StreamRelay): void {
        if (this._relays.indexOf(relay) > -1) {
            return;
        }

        let self = this;

        relay.on('data', (handle) => {
            try {
                self.decode(handle.data, handle.size, handle.context);
            } catch (error) {
                self.log.error(error, 'addRelay.relay.on.data', module.filename);
            }
        });

        relay.on('disconnect', (context) => {
            try {
                self.closeContext(context);
            } catch (error) {
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
    createCodec(library: string, model: HcpModel, context: any): HcpCodec {
        if (this.libraries.indexOf(library) == -1) {
            throw new Error('The codec library ' + library + ' has not been loaded.');
        }

        if (this._models.indexOf(model) == -1) {
            throw new Error('Passed model has not been loaded via parseModel or loadModel and is therefor not loaded into native Hcp.');
        }

        let id = 0;

        try {
            id = Hcp.newCodec(library, model.id);
        } catch (error) {
            // logg
            throw error;
        }

        let result = new HcpCodec(id, model, library, 1024, this.send, this.decode, context, this);
        this._codecs.push(result);

        return result;
    }
}   