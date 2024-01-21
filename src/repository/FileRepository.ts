import fs from "fs";
import Component from "../Component.js";

export default abstract class FileRepository<T> implements Component {

    public static getComponentName(): string {
        return 'FileRepository';
    }

    public abstract init(): void;

    public abstract getFile(): T;

    protected abstract parse(): void;

    public abstract getRawData(): string;

    public abstract setRawData(rawData: string): void;

    protected loadFile(fileAddress: string): string {
        let result: string;
        try {
            result = this.getRawData();
            return result;
        } catch (e) {
            const result: string = fs.readFileSync(fileAddress, 'utf8');
            if (!result) {
                throw new Error("File not found.");
            }
            return result;
        }
    }

}