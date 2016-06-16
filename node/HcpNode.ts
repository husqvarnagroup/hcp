import * as Hcp  from './hcp';
import {EventEmitter} from 'events';
import * as util from 'util';

type ResponseRouter = (data : ArrayBuffer, size : number, context : any) => Promise<any>;
type RequestRouter = (request : TifRequest, timeout : number) => Promise<PendingRequest>;

export interface HcpResult {
    bytesWritten : number;
    result : Object;
    method : {
        command : string;
        family : string;
    }
}

class HcpModel {
    private _id : number;
    private _value : Object;

    constructor(id : number, value : Object) {
        this._id = id;
        this._value = value;
    }
    /**
     * Returns the id of the model assigned when registered in Hcp.
     */
    get id() : number {
        return this._id;
    }
    /**
     * Returns a copy of the loaded model.
     */
    get copyBody() : Object {
        return JSON.stringify(this._value);
    }
}

class TifRequest {
    private _data : ArrayBuffer;
    private _size : number;
    private _codec : HcpCodec;
    private _context : any;
    private _request : string;

    constructor(data : ArrayBuffer, size : number, codec : HcpCodec, context : any, request : string) {
        this._data = data;
        this._size = size;
        this._codec = codec;
        this._context = context;
        this._request = request;
    }
                
    get data() : ArrayBuffer {
        return this._data;
    }

    set size(size : number) {
        this._size = size;
    }

    get size() : number {
        return this._size;
    }

    get codec() : HcpCodec {
        return this._codec;
    }

    get context() : any {
        return this._context;
    }

    get request() : string {
        return this._request;
    }
}

class PendingRequest extends EventEmitter{
    private _request : TifRequest;
    private _timeout : NodeJS.Timer;
    private _finished : boolean;

    constructor(request : TifRequest, timeout : number) {
        super();

        this._request = request;
        this._finished = false;

        if(timeout && timeout > 0) {
           this._timeout = setTimeout((self) => {
               if(!this._finished) {
                   return;
               }

               this._finished = true;
               self.emit('timeout', self._request);
           },timeout, this);
        } else {
            this._timeout = null;
        }
    }
    /**
     * Returns true if the request has finished processing either by
     * receiving data or due to a timeout.
     */
    get finished() : boolean {
        return this._finished;
    }

    tryFinish(result): boolean {
        if(result && result.method) {
            let lhs = util.format('%s.%s', result.method.family, result.method.command);
            let rhs = util.format('%s.%s', this._request.request);

            if(lhs === rhs) {
                this._finished = true;

                if(this._timeout) {
                    clearTimeout(this._timeout);
                }

                this.emit('finish', result);
                return true;
            }
        }
        return false;
    }
}

export class HcpCodec extends EventEmitter {

    private _id : number;
    private _model : HcpModel;
    private _lib: string;
    private _buffer : ArrayBuffer;
    private _requests : Array<PendingRequest>;
    private _encoder : RequestRouter;
    private _decoder : ResponseRouter;
    private _context : any;

    constructor(id : number, model : HcpModel, library : string,  bufferSize : number, encoder : RequestRouter, decoder : ResponseRouter, context : any) {
        super();
        this._id = id;
        this._model = model;
        this._lib = library;
        this._buffer = new ArrayBuffer(bufferSize);
        this._decoder = decoder;
        this._context = context;
    }
    /**
     * Gets a context that was associated with the codec.
     */
    get context(): any {
        return this._context;
    }
    /**
     * Gets a unique id of the codec instance.
     */
    get id() : number {
        return this._id;
    }
    /**
     * Returns a reference to the model that is used when parsing requests.
     */
    get model() : HcpModel {
        return this._model;
    }
    /**
     * Returns the name of the codec library that was used to create the codec instance.
     */
    get library() : string {
        return this._lib;
    }
    /**
     *  Passes a result object to the codec which allows it
     *  to complete any pending requests.
     *  @param result   Device response result.
     */
    receive(result : HcpResult) : void {
        this._requests.filter((request) => {
            return request.tryFinish(result);
        });
    }

    decode(data : ArrayBuffer, size : number, context: any): Promise<HcpResult> {
        return this._decoder(data, size, context);
    }
    /**
     * Sends a TIF-request to a connected device.
     * @param request   TIF-request  to send.
     * @param timeout   Timeout before the request should be considered failed.
     * @return Returns a result object contaning the data returned from the connected device.
     */
    send<T>(request: string, timeout : number) : Promise<T> {
        let run = (resolve, reject) => {
            let tr = new TifRequest(this._buffer, 1024, this, this.context, request);

            this._encoder(tr, timeout)
            .then((pending) => {
                pending.on('timeout', () => {
                    reject(new Error('Response timeout after ' + (timeout || '??') + ' ms.'));
                })
                .on('finish', (result) => {
                    resolve(result);
                });

                this._requests.push(pending);
            });

            this.emit('data', tr);
        };

        return new Promise<T>((resolve, reject) => {
            setImmediate((self) => {
                try {
                    run.bind(self)(resolve, reject);
                } catch(error) {
                    self.emit('error', {
                        request : request,
                        error : error
                    });
                    reject(error);
                }
            }, this);
        });
    }
}

export class HcpNode extends EventEmitter {

    private _path: string;
    private _models: Array<HcpModel>;
    private _codecs : Array<HcpCodec>;
    private _disableEncoding : boolean;

    constructor() {
        super();
        this._models = new Array<HcpModel>();
        this._codecs = new Array<HcpCodec>();
    }
    /**
     * Initializes the Hcp binding, loading codec libraries from disc.
     * @param   codecPath   Relative or full path to codec libraries. Ex: './codecs'  
     */
    init(codecPath : string, disableEncoding : boolean = false) : Promise<void> {
        this._disableEncoding = disableEncoding;

        let run = (resolve : Function, reject : Function) => {
            if(!this._disableEncoding) {
                Hcp.init(codecPath);
            }
            
            resolve();
        };

        return new Promise<void>((resolve: Function, reject: Function) => {
            setImmediate((self) => {
                try {
                    run.bind(self)(resolve, reject);
                } catch(error) {
                    reject(error);
                }
                
            }, this);
        });
    }
    /**
     * Returns an array of loaded codec libraries.
     */
    get libraries() : string {
        return Hcp.getLibraries();
    }
    /**
     * Parses a string into a JSON object and loads it into Hcp.
     * @param   model   TIF-model as a string that should be parsed as a JSON-structure.
     * @return  Returns a HcpModel object, representing the loaded model.
     */
    parseModel(model : string) : HcpModel {
        return this.loadModel(JSON.parse(model));
    }
    /**
     * Parses a string into a JSON object and loads it into Hcp.
     * @param   model   TIF-model object to be loaded.
     * @return  Returns a HcpModel object, representing the loaded model.
     */
    loadModel(model : Object) : HcpModel {
        let id = 0;
        let copy = JSON.stringify(model);
        try {
            id = Hcp.loadModel(copy);
        } catch(error) {
            // logg
            throw error;
        }

        let result = new HcpModel(id, JSON.parse(copy));
        this._models.push(result);

        return result;
    }

    decode(data : ArrayBuffer, size : number, context: any) : Promise<Array<HcpResult>> {
        let results = new Array<HcpResult>();

        let run = (resolve, reject) => {
            if(!this._disableEncoding) {
                this._codecs.forEach((codec) => {
                    if(codec.context == context) {
                        let result = null;
                        
                        try {
                            result = Hcp.decode(codec.id, data, data.byteLength);
                        } catch(error) {
                            util.log(JSON.stringify(error));
                            return;
                        }

                        try {
                            codec.receive(result);
                        } catch(error) {
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
                } catch(error) {
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
    receive(result: HcpResult, context : any) : Promise<void> {
        let run = (resolve, reject) => {
            this._codecs.forEach((codec) => {
                if(codec.context == context) {
                    try {
                        codec.receive(result);
                    } catch(error) {
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
                } catch(error) {
                    reject(error);
                }
            }, this);
        });
    }

    send(request : TifRequest, timeout : number)  : Promise<PendingRequest> {
        let run = (resolve, reject) => {
            if(!this._disableEncoding) {
                request.size = Hcp.encode(request.codec.id, request, request.data, request.size);
            }

            this.emit('data', request);

            resolve(new PendingRequest(request, timeout));
        };

        return new Promise((resolve, reject) => {
            setImmediate((self) => {
                try {
                    run.bind(self)(resolve, reject);
                } catch(error) {
                    reject(error);
                }
            }, this);
        }); 
    }
    /**
     * Creates a new codec instance using a pre-loaded TIF-model.
     * @param   library Name of the codec library to use when creating the new instance.
     * @param   model   Model to use when encoding and decoding data.
     * @param   context   Context that is associated with the codec and passed to events each time an event 
     *                    is triggered by the codec. Use this to determine which code that is sending data.  
     * @return  Returns a reference to the created codec instance.
     */
    createCodec(library : string, model : HcpModel, context : any) : HcpCodec {
        if(this.libraries.indexOf(library) == -1) {
            throw new Error('The codec library ' + library + ' has not been loaded.');
        }

        if(this._models.indexOf(model) == -1) {
            throw new Error('Passed model has not been loaded via parseModel or loadModel and is therefor not loaded into native Hcp.');
        }

        let id = 0;

        try {
            id = Hcp.newCodec(library, model.id);
        } catch(error) {
            // logg
            throw error;
        }

        let result = new HcpCodec(id, model, library, 1024, this.send, this.decode, context);
        this._codecs.push(result);

        return result;
    }
}   