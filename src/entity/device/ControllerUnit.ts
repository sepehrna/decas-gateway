export default class ControllerUnit {

    private readonly _version: string;
    private readonly _model: string;

    constructor(version: string, model: string) {
        this._version = version;
        this._model = model;
    }

    get version(): string {
        return this._version;
    }

    get model(): string {
        return this._model;
    }

}