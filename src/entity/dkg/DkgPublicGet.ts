export default class DkgPublicGet {

    private _operationId: string;
    private _status: string;

    constructor(operationId: string, status: string) {
        this._operationId = operationId;
        this._status = status;
    }

    get operationId(): string {
        return this._operationId;
    }

    set operationId(value: string) {
        this._operationId = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }
}