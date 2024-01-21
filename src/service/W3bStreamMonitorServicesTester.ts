import ApplicationServices from "../domain/ApplicationServices.js";
import {publishEvents} from "../facade/W3bStreamFacade.js";
import * as XLSX from 'xlsx';
import Header from "../entity/w3bstream/Header.js";
import {W3bStreamEventType} from "../enum/W3bStreamEventType.js";
import W3bStreamEvent from "../entity/w3bstream/W3bStreamEvent.js";
import fs from "fs";


export default class W3bStreamMonitorServicesTester extends ApplicationServices {

    private readonly filePath: string;
    private readonly deviceId: string;
    private readonly interval: number;

    constructor(filePath: string, deviceId: string, interval: number) {
        super();
        this.filePath = filePath;
        this.deviceId = deviceId;
        this.interval = interval;
    }

    public readTemperatures(): any[] {
        const fileData = fs.readFileSync(this.filePath);
        const workbook = XLSX.read(fileData, {type: 'buffer'});
        const sheetNames = workbook.SheetNames;
        let data: any[] = [];
        for (const sheetName of sheetNames) {
            const worksheet = workbook.Sheets[sheetName];
            data = XLSX.utils.sheet_to_json(worksheet, {header: 1});
        }
        return data.map((row) => row[2]);
    }

    public async run(): Promise<void> {
        let temperatures = this.readTemperatures();
        let events: W3bStreamEvent<any>[] = [];
        let slicedList = temperatures.slice(2, 3);
        console.log(slicedList);
        for (const temp of slicedList) {
            const header: Header = new Header(W3bStreamEventType.TemperatureObservation, "", "", new Date().getTime().toString(), this.deviceId);
            const payload = {
                deviceId: 1001,
                temperatureCentigrade: "" + temp,
                actualTime: new Date().toISOString()
            }
            let w3bStreamEvent: W3bStreamEvent<any> = new W3bStreamEvent(header, payload, W3bStreamEventType.TemperatureObservation);
            events.push(w3bStreamEvent);
        }
        publishEvents(events, this.interval, this.interval * 1000);
    }
}