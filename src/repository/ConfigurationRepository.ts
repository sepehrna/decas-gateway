import FileRepository from "./FileRepository.js";
import Configuration from "../entity/configuration/Configuration.js";

export default class ConfigurationRepository extends FileRepository<Configuration> {

    public static getComponentName(): string {
        return 'ConfigurationRepository';
    }

    private rawData: string | undefined;
    private configuration: Configuration | undefined;

    public init(): void {
        this.rawData = super.loadFile('config.json');
        this.parse();
    }

    public getFile(): Configuration {
        if (!this.configuration) {
            throw new Error("System configuration not found.");
        }
        return this.configuration;
    }

    public getRawData(): string {
        if (!this.rawData) {
            throw new Error("System configuration's raw data not found.");
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
            this.configuration = JSON.parse(this.rawData);
        }
    }

}