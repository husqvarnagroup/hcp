"use strict";
const events_1 = require('events');
const tif_request_1 = require('./tif-request');
class HcpCodec extends events_1.EventEmitter {
    constructor(id, model, library, bufferSize, encoder, decoder, context, host) {
        super();
        this._id = id;
        this._model = model;
        this._lib = library;
        this._buffer = new ArrayBuffer(bufferSize);
        this._decoder = decoder;
        this._encoder = encoder;
        this._context = context;
        this._requests = new Array();
        this._host = host;
    }
    close() {
        console.log('close me!');
    }
    /**
     * Gets a context that was associated with the codec.
     */
    get context() {
        return this._context;
    }
    /**
     * Gets a unique id of the codec instance.
     */
    get id() {
        return this._id;
    }
    /**
     * Returns a reference to the model that is used when parsing requests.
     */
    get model() {
        return this._model;
    }
    /**
     * Returns the name of the codec library that was used to create the codec instance.
     */
    get library() {
        return this._lib;
    }
    /**
     *  Passes a result object to the codec which allows it
     *  to complete any pending requests.
     *  @param result   Device response result.
     */
    receive(result) {
        this._requests.filter((request) => {
            return request.tryFinish(result);
        });
    }
    decode(data, size, context) {
        return this._decoder(data, size, context);
    }
    /**
     * Sends a TIF-request to a connected device.
     * @param request   TIF-request  to send.
     * @param timeout   Timeout before the request should be considered failed.
     * @return Returns a result object contaning the data returned from the connected device.
     */
    send(request, timeout) {
        let run = (resolve, reject) => {
            let tr = new tif_request_1.TifRequest(this._buffer, 1024, this, this.context, request);
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
        return new Promise((resolve, reject) => {
            setImmediate((self) => {
                try {
                    run.bind(self)(resolve, reject);
                }
                catch (error) {
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
exports.HcpCodec = HcpCodec;
//# sourceMappingURL=hcp-codec.js.map