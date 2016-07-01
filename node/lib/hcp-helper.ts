'use strict';

import {HcpNode} from './HcpNode';
import {HcpModel} from './hcp-model';
import {HcpCodec} from './hcp-codec';
import {DeviceInformation} from './tif-test';
import {SerialPortRelay, StreamRelay} from './stream-relay';                                                                    

export class HcpHelper {

    private _relay : StreamRelay;
    private _model : HcpModel;
    private _codec : HcpCodec;

    private static _hcp : HcpNode;

    constructor(relay : StreamRelay, model : HcpModel, codec : HcpCodec) {
        this._relay = relay;
        this._model = model;
        this._codec = codec;
    }

    get codec() : HcpCodec {
        return this._codec;
    }

    static createSerial(port : string, library : string, tifModel : Object) : Promise<HcpHelper> {
        let wait : Promise<void> = null;

        if(!HcpHelper._hcp) {
            HcpHelper._hcp = new HcpNode();
            wait = HcpHelper._hcp.init('./codecs');
        } else {
            wait = Promise.resolve();
        }

        let relay : StreamRelay = null; 

        return wait.then(() => {
            relay = new SerialPortRelay();
            return relay.init(port, 5000);
        })                                              
        .then((relay) => {
            HcpHelper._hcp.addRelay(relay); 
            return relay.createCodecContext(); 
        })
        .then((context) => {
            let model = HcpHelper._hcp.loadModel(tifModel);
            let codec = HcpHelper._hcp.createCodec(library, model, context);
            return Promise.resolve(new HcpHelper(relay, model, codec));
        });
    }
}