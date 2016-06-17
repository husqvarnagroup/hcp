"use strict";
const SerialPort_1 = require('SerialPort');
const events_1 = require('events');
const hcp_log_1 = require('./hcp-log');
class StreamRelay extends events_1.EventEmitter {
    constructor(log = new hcp_log_1.HcpLog()) {
        super();
        this._log = log || new hcp_log_1.HcpLog();
        this._contexts = new Array();
    }
    connect(context) {
        let self = this;
        this._log.info(JSON.stringify(context), 'connect', module.filename);
        setImmediate(() => {
            self.emit('connect', context);
        });
    }
    disconnect(context) {
        let self = this;
        this._log.info(JSON.stringify(context), 'disconnect', module.filename);
        let index = this._contexts.indexOf(context);
        if (index > -1) {
            this._contexts.splice(index, 1);
        }
        setImmediate(() => {
            self.emit('disconnect', context);
        }, this);
    }
    error(error, context) {
        let self = this;
        this._log.error({
            error: error,
            context: context }, 'error', module.filename);
        setImmediate(() => {
            self.emit('error', {
                error: error,
                context: context
            });
        }, this);
    }
    data(data, size, context) {
        let self = this;
        this._log.info(data, 'data', module.filename);
        setImmediate(() => {
            self.emit('data', {
                data: data,
                size: size,
                context: context
            });
        }, this);
    }
    /**
     * Gets the streams log instance.
     */
    get log() {
        return this._log;
    }
    /**
     * Returns true if a context is associated with the current stream.
     * @param context   Context created by calling [createCodecContext]
     * @return Returns true if the context is owned by the current instance.
     */
    ownsContext(context) {
        return this._contexts.indexOf(context) > -1;
    }
    createCodecContext() {
        let context = null;
        let run = (self, resolve, reject) => {
            context = self.onCreateCodecContext();
            if (!context || self._contexts.indexOf(context) > -1) {
                this._log.warn('onCreateCodecContext did not return a unique instance.', 'createCodecContext', module.filename);
                reject(new Error('The stream could not spawn an additional context. You might need to close existing contexts before trying again.'));
            }
            else {
                this._log.info(context, 'createCodecContext', module.filename);
                self._contexts.push(context);
                resolve(context);
            }
        };
        return new Promise((resolve, reject) => {
            let self = this;
            setImmediate(() => {
                try {
                    run(self, resolve, reject);
                }
                catch (error) {
                    this._log.error(error, 'createCodecContext', module.filename);
                    reject(error);
                }
            });
        });
    }
}
exports.StreamRelay = StreamRelay;
class SerialPortRelay extends StreamRelay {
    constructor() {
        super();
    }
    onCreateCodecContext() {
        return this._port;
    }
    write(request) {
        this._handle.write(Buffer.from(request.data, 0, request.size));
    }
    init(port, timeout) {
        this._port = port;
        let self = this;
        let run = (self, resolve, reject) => {
            this._handle = new SerialPort_1.SerialPort(port, {}, false);
            this._handle.on('open', () => {
                resolve(self);
                super.connect(port);
            });
            this._handle.on('close', () => {
                super.disconnect(port);
            });
            this._handle.on('error', (error) => {
                super.error(error, port);
            });
            this._handle.on('data', (data) => {
                super.data(data, data.length, port);
            });
            try {
                this._handle.open();
            }
            catch (error) {
                reject(error);
            }
        };
        return new Promise((resolve, reject) => {
            setImmediate(() => {
                try {
                    run(self, resolve, reject);
                }
                catch (error) {
                    this.log.error(error, 'SerialPortRelay.init', module.filename);
                    reject(error);
                }
            }, self);
        });
    }
}
exports.SerialPortRelay = SerialPortRelay;
//# sourceMappingURL=stream-relay.js.map