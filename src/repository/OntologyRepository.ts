import * as rdf from 'rdflib';
import FileRepository from "./FileRepository.js";
import {IndexedFormula} from "rdflib";
import {DkgContentType} from "../enum/DkgContentType.js";
import {JSONLDContentType} from "rdflib/lib/types.js";
import DkgOperationResponse from "../entity/dkg/DkgOperationResponse.js";
import {createAsset, findAsset} from "../facade/OriginTrailFacade.js";


export default class OntologyRepository extends FileRepository<IndexedFormula> {

    public static getComponentName(): string {
        return 'OntologyRepository';
    }

    private readonly source: string = "";
    private readonly filePath: string = "";
    private ual: string = "";
    private readonly autoCreate: boolean = false;
    private readonly dkgContentType: DkgContentType;
    private readonly ontologyContentType: string = JSONLDContentType;
    private rawData: string | undefined;
    private ontology: rdf.Store = rdf.graph();


    constructor(source: string, filePath: string, ual: string, autoCreate: boolean, dkgContentType: DkgContentType) {
        super();
        this.source = source;
        this.filePath = filePath;
        this.ual = ual;
        this.autoCreate = autoCreate;
        this.dkgContentType = dkgContentType;
    }

    public async init(): Promise<void> {
        let fetchedAsset: string[] = [];
        if (this.ual !== "") {
            let findResponse: DkgOperationResponse = await findAsset(this.ual, this.dkgContentType);
            fetchedAsset = findResponse.assertion;
        } else {
            if (this.autoCreate) {
                this.rawData = super.loadFile(this.filePath);
                let createResponse: DkgOperationResponse | undefined;
                if (this.dkgContentType === DkgContentType.Private) {
                    createResponse = await createAsset("", this.rawData);
                }
                if (!createResponse) {
                    createResponse = await createAsset(this.rawData, "");
                }
                this.ual = createResponse.UAL;
                await this.init();
            }
        }
        if (fetchedAsset.length > 0) {
            this.rawData = fetchedAsset.pop();
            this.parse();
        }
    }

    public getFile(): IndexedFormula {
        if (!this.ontology) {
            throw new Error("Ontology's raw file not found.");
        }
        return this.ontology;
    }

    public getRawData(): string {
        if (!this.rawData) {
            throw new Error("Ontology's raw file not found.");
        }
        return this.rawData;
    }

    public setRawData(rawData: string): void {
        if (!rawData) {
            throw new Error("Raw data is not valid. ");
        }
        this.parse();
    }

    protected parse(): void {
        if (this.rawData) {
            rdf.parse(this.rawData, this.ontology, this.source, this.ontologyContentType);
        }
    }
}

