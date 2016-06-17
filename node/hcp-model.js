"use strict";
class HcpModel {
    constructor(id, value) {
        this._id = id;
        this._value = value;
    }
    /**
     * Returns the id of the model assigned when registered in Hcp.
     */
    get id() {
        return this._id;
    }
    /**
     * Returns a copy of the loaded model.
     */
    get copyBody() {
        return JSON.stringify(this._value);
    }
}
exports.HcpModel = HcpModel;
//# sourceMappingURL=hcp-model.js.map