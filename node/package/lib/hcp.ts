import {HcpModel, ModelBody} from './hcp-model';
import * as os from 'os';

let nativePath : string = './bin/';

switch(os.arch()) {
    case "x64" : {
        nativePath += 'x64'
    } break;
    default : {
        nativePath += 'x86'
    }
}

const native = require(nativePath + '/hcp.node');

export {HcpDevice} from './hcp-device';
export type HcpResponse = {};


export class HcpCodec {
    private _id : number;
    private _model : HcpModel;

    constructor(id : number, model : HcpModel){
        this._id = id;    
        this._model = model;
    }

    public get model() {
        return this._model;
    }

    public encode(request : string, destination : ArrayBuffer ) : number {
        return native.encode(this._id, request, destination);
    } 

    public decode(response : Buffer) : HcpResponse {
        return native.decode(this._id, response, response.length);
    }
}

export type HcpRuntime = {
    init : (string) => void;
    getLibraries : () => string[];
    loadModel : (model : ModelBody) => HcpModel;
    newCodec : (libraryName : string, model : HcpModel) => HcpCodec;
}

export const Hcp : HcpRuntime = {
    init : native.init,
    getLibraries : native.getLibraries,
    loadModel : (model : ModelBody) : HcpModel => {
        let id = native.loadModel(JSON.stringify(model));
        return new HcpModel(id, model);
    },
    newCodec : (lib, model) => {
        let id = native.newCodec(lib, model.id);
        return new HcpCodec(id, model);
    }
}