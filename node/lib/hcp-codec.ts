import {HcpModel} from './hcp-model';
import {EventEmitter} from 'events';
import {PendingRequest} from './pending-request';
import {RequestRouter, ResponseRouter} from './hcp-routing';
import {HcpResult} from './hcp-result';
import {HcpNode} from './HcpNode';
import {TifRequest} from './tif-request';

export class HcpCodec extends EventEmitter {

    private _id: number;
    private _model: HcpModel;
    private _lib: string;
    private _buffer: ArrayBuffer;
    private _requests: Array<PendingRequest>;
    private _encoder: RequestRouter;
    private _decoder: ResponseRouter;
    private _context: any;
    private _host: HcpNode;

    constructor(id: number, model: HcpModel, library: string, bufferSize: number, encoder: RequestRouter, decoder: ResponseRouter, context: any, host: HcpNode) {
        super();
        this._id = id;
        this._model = model;
        this._lib = library;
        this._buffer = new ArrayBuffer(bufferSize);
        this._decoder = decoder;
        this._encoder = encoder;
        this._context = context;
        this._requests = new Array<PendingRequest>();
        this._host = host;
    }

    close() {
        console.log('close me!');
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
    get id(): number {
        return this._id;
    }
    /**
     * Returns a reference to the model that is used when parsing requests.
     */
    get model(): HcpModel {
        return this._model;
    }
    /**
     * Returns the name of the codec library that was used to create the codec instance.
     */
    get library(): string {
        return this._lib;
    }
    /**
     *  Passes a result object to the codec which allows it
     *  to complete any pending requests.
     *  @param result   Device response result.
     */
    receive(result: HcpResult): void {
        this._requests.filter((request) => {
            return request.tryFinish(result);
        });
    }

    decode(data: ArrayBuffer, size: number, context: any): Promise<HcpResult> {
        return this._decoder(data, size, context);
    }
    /**
     * Sends a TIF-request to a connected device.
     * @param request   TIF-request  to send.
     * @param timeout   Timeout before the request should be considered failed.
     * @return Returns a result object contaning the data returned from the connected device.
     */
    send<T>(request: string, timeout: number): Promise<T> {
        let run = (resolve, reject) => {
            let tr = new TifRequest(this._buffer, 1024, this, this.context, request);
            let self = this;

            this._host.send(tr, timeout)
                .then((pending) => {

                    pending.on('timeout', () => {
                        reject(new Error('Response timeout after ' + (timeout || '??') + ' ms.'));
                    })
                        .on('finish', (result) => {
                            resolve(result);
                        });

                    self._requests.push(pending);
                });

            this.emit('data', tr);
        };

        return new Promise<T>((resolve, reject) => {
            setImmediate((self) => {
                try {
                    run.bind(self)(resolve, reject);
                } catch (error) {
                    self.emit('error', {
                        request: request,
                        error: error
                    });
                    reject(error);
                }
            }, this);
        });
    }
}