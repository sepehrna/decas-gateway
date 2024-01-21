import DkgPublicGet from "./DkgPublicGet.js";


export default class DkgOperation {

    private _operationId: string;
    private _status: string;
    private _publicGet: DkgPublicGet;

    constructor(operationId: string, status: string, publicGet: DkgPublicGet) {
        this._operationId = operationId;
        this._status = status;
        this._publicGet = publicGet;
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

    get publicGet(): DkgPublicGet {
        return this._publicGet;
    }

    set publicGet(value: DkgPublicGet) {
        this._publicGet = value;
    }
}