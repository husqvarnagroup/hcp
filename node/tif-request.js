"use strict";
class TifRequest {
    constructor(data, size, codec, context, request) {
        this._data = data;
        this._size = size;
        this._codec = codec;
        this._context = context;
        this._request = request;
    }
    get data() {
        return this._data;
    }
    set size(size) {
        this._size = size;
    }
    get size() {
        return this._size;
    }
    get codec() {
        return this._codec;
    }
    get context() {
        return this._context;
    }
    get request() {
        return this._request;
    }
}
exports.TifRequest = TifRequest;
//# sourceMappingURL=tif-request.js.map