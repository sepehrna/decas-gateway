import {DkgContentType} from "../../enum/DkgContentType.js";


export default class KnowledgeAsset {

    private readonly _sourceOntology: string;
    private readonly _filePath: string;
    private readonly _assetUal: string;
    private readonly _autoCreate: boolean;
    private readonly _contentType: DkgContentType;
    constructor(sourceOntology: string, filePath: string, assetUal: string, autoCreate: boolean, contentType: DkgContentType) {
        this._sourceOntology = sourceOntology;
        this._filePath = filePath;
        this._assetUal = assetUal;
        this._autoCreate = autoCreate;
        this._contentType = contentType;
    }

    get sourceOntology(): string {
        return this._sourceOntology;
    }

    get filePath(): string {
        return this._filePath;
    }

    get assetUal(): string {
        return this._assetUal;
    }

    get autoCreate(): boolean {
        return this._autoCreate;
    }

    get contentType(): DkgContentType {
        return this._contentType;
    }
}