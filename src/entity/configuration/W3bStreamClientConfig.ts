export default class W3bStreamClientConfig {

    private readonly _url: string;
    private readonly _apiKey: string;
    private readonly _deviceId: string;
    constructor(url: string, apiKey: string, deviceId: string) {
        this._url = url;
        this._apiKey = apiKey;
        this._deviceId = deviceId;
    }
    get url(): string {
        return this._url;
    }
    get apiKey(): string {
        return this._apiKey;
    }
    get deviceId(): string {
        return this._deviceId;
    }

}