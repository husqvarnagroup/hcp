/// <reference types="node" />
/// <reference types="serialport" />

import * as SerialPort from 'serialport';
import { Hcp, HcpCodec } from './hcp';
import { EventEmitter } from 'events';
import { Completer } from 'readline';

export class HcpDevice extends EventEmitter {
    private _port: SerialPort;
    private _isConnected: boolean;
    private _codec: HcpCodec;
    private _writeBuffer: ArrayBuffer;

    constructor() {
        super();
        this._isConnected = false;
        this._codec = null;
        this._writeBuffer = new ArrayBuffer(1024);
    }
    /**
     * Returns all avalible device ports (serial ports).
     */
    public static async getSerialPorts(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            try {
                SerialPort.list((error, ports) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(ports.map((port) => port.comName));
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
     * Sends a request and waits for a response to return.
     */
    public async send<T>(request: string, timeout: number): Promise<T> {
        let self: HcpDevice = this;

        return new Promise<T>((resolve, reject) => {
            // clear previous response

            let timeout: NodeJS.Timer = null;

            let onData = (response: T): void => {
                if (timeout) {
                    clearTimeout(timeout);
                    // remove us as a listener
                    self.removeListener('data', onData);
                    timeout = null;
                    // return the response
                    resolve(response);
                }
            };
            // start listening for incoming responses
            self.on('data', onData);

            try {
                this.write(request)
                    .then(() => {
                        // wait for data to come in or timeout...
                        timeout = setTimeout((self: HcpDevice) => {
                            timeout = null;
                            self.removeListener('data', onData);
                            reject('Response timed out.');
                        }, 1000, this);
                    })
                    .catch(reject);
            } catch (error) {
                if (timeout) {
                    clearTimeout(timeout);
                    self.removeListener('data', onData);
                }

                reject(error);
            }

        });
    }

    public get completer(): Completer {
        return this._codec.model.completer;
    }
    /**
     * Write a request to the serial port and waits for the bytes to be written.
     */
    public async write(request: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let bytesWritten: number = 0;

            try {
                bytesWritten = this._codec.encode(request, this._writeBuffer);
            } catch (error) {
                reject(error);
                return;
            }

            if (bytesWritten > 0) {
                try {
                    this._port.write(Buffer.from(this._writeBuffer, 0, bytesWritten),
                        (error) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve();
                            }
                        });
                } catch (error) {
                    reject(error);
                }
            }
        });
    }
    /**
     * Attempts to connect to a device.
     */
    public async connect(port: string, library: string, model: any): Promise<HcpDevice> {
        let self: HcpDevice = this;
        this._isConnected = false;

        return new Promise<HcpDevice>((resolve, reject) => {
            try {
                this._port = new SerialPort(port, { autoOpen: true }, ((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        try {
                            self.initialize.bind(self)(library, model);
                        } catch (error) {
                            reject(error);
                            return;
                        }

                        self._port.on('data', self.onReceiveData.bind(self));

                        self._isConnected = true;
                        resolve(self);
                    }
                }) as any);
            } catch (error) {
                reject(error);
            }
        });
    }

    private initialize(library: string, modelObj: any): void {
        let model = Hcp.loadModel(modelObj);
        this._codec = Hcp.newCodec(library, model);

        // generate the model-ts file
        model.compileTo('./temp-mode.ts');
    }
    /**
     * Returns a value which indicate if a connection has been established by calling connect
     */
    public get isConnected() {
        return this._isConnected;
    }

    private onReceiveData(data: Buffer): void {
        if (data && data.length > 0) {
            let response = this._codec.decode(data);

            if (response) {
                this.emit('data', response);
            }
        }
    }
}