import {Role} from "../../enum/Role.js";
import W3bStreamClientConfig from "./W3bStreamClientConfig.js";
import Platform from "../device/Platform.js";
import DkgConfig from "./DkgConfig.js";
import KnowledgeAsset from "./KnowledgeAsset.js";

export default class Configuration {

    private readonly _role: Role;
    private readonly _interval: number;
    private readonly _mode: string;
    private readonly _simulationDataPath: string;
    private readonly _w3bStreamClient: W3bStreamClientConfig;
    private readonly _platform: Platform;
    private readonly _dkg: DkgConfig;
    private readonly _asset: KnowledgeAsset;

    constructor(role: Role, interval: number, mode: string, simulationDataPath: string, w3bStreamClient: W3bStreamClientConfig, platform: Platform, dkg: DkgConfig, asset: KnowledgeAsset) {
        this._role = role;
        this._interval = interval;
        this._mode = mode;
        this._simulationDataPath = simulationDataPath;
        this._w3bStreamClient = w3bStreamClient;
        this._platform = platform;
        this._dkg = dkg;
        this._asset = asset;
    }

    get interval(): number {
        return this._interval;
    }

    get mode(): string {
        return this._mode;
    }

    get simulationDataPath(): string {
        return this._simulationDataPath;
    }

    get w3bStreamClient(): W3bStreamClientConfig {
        return this._w3bStreamClient;
    }

    get role(): Role {
        return this._role;
    }

    get platform(): Platform {
        return this._platform;
    }

    get dkg(): DkgConfig {
        return this._dkg;
    }

    get asset(): KnowledgeAsset {
        return this._asset;
    }

}
