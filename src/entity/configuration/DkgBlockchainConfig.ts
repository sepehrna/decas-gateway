export default class DkgBlockchainConfig {

    private readonly _hubContract: string;
    private readonly _rpc: string;
    private readonly _name: string;
    private readonly _publicKey: string;
    private readonly _privateKey: string;

    constructor(hubContract: string, rpc: string, name: string, publicKey: string, privateKey: string) {
        this._hubContract = hubContract;
        this._rpc = rpc;
        this._name = name;
        this._publicKey = publicKey;
        this._privateKey = privateKey;
    }

    get hubContract(): string {
        return this._hubContract;
    }

    get rpc(): string {
        return this._rpc;
    }

    get name(): string {
        return this._name;
    }

    get publicKey(): string {
        return this._publicKey;
    }

    get privateKey(): string {
        return this._privateKey;
    }
}