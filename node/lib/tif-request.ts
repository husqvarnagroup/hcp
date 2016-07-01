import {HcpCodec} from './hcp-codec';

export class TifRequest {
    private _data: ArrayBuffer;
    private _size: number;
    private _codec: HcpCodec;
    private _context: any;
    private _request: string;

    constructor(data: ArrayBuffer, size: number, codec: HcpCodec, context: any, request: string) {
        this._data = data;
        this._size = size;
        this._codec = codec;
        this._context = context;
        this._request = request;
    }

    get data(): ArrayBuffer {
        return this._data;
    }

    set size(size: number) {
        this._size = size;
    }

    get size(): number {
        return this._size;
    }

    get codec(): HcpCodec {
        return this._codec;
    }

    get context(): any {
        return this._context;
    }

    get request(): string {
        return this._request;
    }
}