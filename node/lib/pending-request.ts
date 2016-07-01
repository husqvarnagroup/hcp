import {EventEmitter} from 'events';
import {TifRequest} from './tif-request';
import * as util from 'util';
import {HcpResult} from './hcp-result';

export class PendingRequest extends EventEmitter {
    private _request: TifRequest;
    private _timeout: NodeJS.Timer;
    private _finished: boolean;

    constructor(request: TifRequest, timeout: number) {
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
        } else {
            this._timeout = null;
        }
    }
    /**
     * Returns true if the request has finished processing either by
     * receiving data or due to a timeout.
     */
    get finished(): boolean {
        return this._finished;
    }

    tryFinish(handle : HcpResult): boolean {
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