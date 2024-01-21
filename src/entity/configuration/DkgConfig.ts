import DkgBlockchainConfig from "./DkgBlockchainConfig.js";


export default class DkgConfig {

    private readonly _environment: string;
    private readonly _endpoint: string;
    private readonly _port: number;
    private readonly _blockchain: DkgBlockchainConfig;

    constructor(environment: string, endpoint: string, port: number, blockchain: DkgBlockchainConfig) {
        this._environment = environment;
        this._endpoint = endpoint;
        this._port = port;
        this._blockchain = blockchain;
    }


    get environment(): string {
        return this._environment;
    }

    get endpoint(): string {
        return this._endpoint;
    }

    get port(): number {
        return this._port;
    }

    get blockchain(): DkgBlockchainConfig {
        return this._blockchain;
    }

}