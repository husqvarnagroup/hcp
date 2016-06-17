"use strict";
const events_1 = require('events');
const util = require('util');
class PendingRequest extends events_1.EventEmitter {
    constructor(request, timeout) {
        super();
        this._request = request;
        this._finished = false;
        if (timeout && timeout > 0) {
            this._timeout = setTimeout((self) => {
                if (this._finished) {
                    return;
                }
                this._finished = true;
                self.emit('timeout', self._request);
            }, timeout, this);
        }
        else {
            this._timeout = null;
        }
    }
    /**
     * Returns true if the request has finished processing either by
     * receiving data or due to a timeout.
     */
    get finished() {
        return this._finished;
    }
    tryFinish(handle) {
        if (handle && handle.result.method) {
            let lhs = util.format('%s.%s', handle.result.method.family, handle.result.method.command);
            let rhs = util.format('%s', this._request.request.substr(0, this._request.request.indexOf('()')));
            if (lhs === rhs) {
                this._finished = true;
                if (this._timeout) {
                    clearTimeout(this._timeout);
                }
                this.emit('finish', handle.result.outParams);
                return true;
            }
        }
        return false;
    }
}
exports.PendingRequest = PendingRequest;
//# sourceMappingURL=pending-request.js.map