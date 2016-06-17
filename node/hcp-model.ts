export class HcpModel {
    private _id: number;
    private _value: Object;

    constructor(id: number, value: Object) {
        this._id = id;
        this._value = value;
    }
    /**
     * Returns the id of the model assigned when registered in Hcp.
     */
    get id(): number {
        return this._id;
    }
    /**
     * Returns a copy of the loaded model.
     */
    get copyBody(): Object {
        return JSON.stringify(this._value);
    }
}