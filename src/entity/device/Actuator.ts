import Device from "./Device.js";
import {HardwareConnectionType} from "../../enum/HardwareConnectionType.js";


export default class Actuator extends Device {

    private readonly _connectionType: HardwareConnectionType;
    private readonly _folderStartDigits: string;

    constructor(id: number, individualName: string, type: string, connectionType: HardwareConnectionType, folderStartDigits: string) {
        super(id, individualName, type);
        this._connectionType = connectionType;
        this._folderStartDigits = folderStartDigits;
    }

    get connectionType(): HardwareConnectionType {
        return this._connectionType;
    }

    get folderStartDigits(): string {
        return this._folderStartDigits;
    }
}