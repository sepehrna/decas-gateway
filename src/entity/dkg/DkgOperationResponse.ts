import DkgOperation from "./DkgOperation.js";

export default class DkgOperationResponse {

    private _UAL: string;
    private _publicAssertionId: string;
    private _operation: DkgOperation;
    private _assertion: any[];

    constructor(UAL: string, publicAssertionId: string, operation: DkgOperation, assertion: []) {
        this._UAL = UAL;
        this._publicAssertionId = publicAssertionId;
        this._operation = operation;
        this._assertion = assertion;
    }

    get UAL(): string {
        return this._UAL;
    }

    set UAL(value: string) {
        this._UAL = value;
    }

    get publicAssertionId(): string {
        return this._publicAssertionId;
    }

    set publicAssertionId(value: string) {
        this._publicAssertionId = value;
    }

    get operation(): DkgOperation {
        return this._operation;
    }

    set operation(value: DkgOperation) {
        this._operation = value;
    }

    get assertion(): any[] {
        return this._assertion;
    }

    set assertion(value: any[]) {
        this._assertion = value;
    }
}