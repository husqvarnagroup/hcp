import {SerialPort} from 'SerialPort';
import {EventEmitter} from 'events';
import {HcpLog} from './hcp-log';
import {TifRequest} from './tif-request';

export abstract class StreamRelay extends EventEmitter {

    private _contexts: Array<any>;
    private _log : HcpLog;

    constructor(log : HcpLog = new HcpLog()) {
        super();

        this._log = log || new HcpLog();
        this._contexts = new Array<any>();
    }

    public abstract init(args: any, timeout): Promise<StreamRelay>;

    protected connect(context: any): void {
        let self = this;

        this._log.info(JSON.stringify(context), 'connect', module.filename);

        setImmediate(() => {
            self.emit('connect', context);
        });
    }

    protected disconnect(context: any): void {
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

    protected error(error, context: any): void {
        let self = this;

        this._log.error({
            error : error,
            context : context }, 
            'error', module.filename);

        setImmediate(() => {
            self.emit('error', {
                error: error,
                context: context
            });
        }, this);
    }

    protected data(data: any, size: number, context: any): void {
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
    protected get log() : HcpLog {
        return this._log;
    }

    public abstract write(request : TifRequest): void;
    /**
     * Returns true if a context is associated with the current stream.
     * @param context   Context created by calling [createCodecContext]
     * @return Returns true if the context is owned by the current instance.
     */
    public ownsContext(context : any) : boolean {
        return this._contexts.indexOf(context) > -1;
    }

    public createCodecContext(): any {
        let context = null;

        let run = (self: StreamRelay, resolve, reject) => {
            context = self.onCreateCodecContext();

            if (!context || self._contexts.indexOf(context) > -1) {
                this._log.warn('onCreateCodecContext did not return a unique instance.', 'createCodecContext', module.filename);
                reject(new Error('The stream could not spawn an additional context. You might need to close existing contexts before trying again.'));
            } else {
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
                } catch (error) {
                    this._log.error(error, 'createCodecContext', module.filename);
                    reject(error);
                }
            });
        });
    }

    public abstract onCreateCodecContext(): any;
}

export class SerialPortRelay extends StreamRelay {
    private _handle: SerialPort;
    private _port: string;

    constructor() {
        super();
    }

    onCreateCodecContext() {
        return this._port;
    }

    public write(request : TifRequest): void {
        this._handle.write(Buffer.from(request.data, 0, request.size));
    }

    init(port, timeout): Promise<StreamRelay> {
        this._port = port;
        let self = this;

        let run = (self: SerialPortRelay, resolve, reject) => {
            this._handle = new SerialPort(port, {}, false);
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
            } catch (error) {
                reject(error);
            }
        };

        return new Promise<StreamRelay>((resolve, reject) => {
            setImmediate(() => {
                try {
                    run(self, resolve, reject);
                } catch (error) {
                    this.log.error(error, 'SerialPortRelay.init', module.filename);
                    reject(error);
                }
            }, self);
        });
    }
}