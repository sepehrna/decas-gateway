import Header from "./Header.js";
import {W3bStreamEventType} from "../../enum/W3bStreamEventType.js";

export default class W3bStreamEvent<T> {

    private header: Header;
    private payload: T;
    private eventType: W3bStreamEventType;

    constructor(header: Header, payload: T, eventType: W3bStreamEventType) {
        this.header = header;
        this.payload = payload;
        this.eventType = eventType;
    }

    get getHeader(): Header {
        return this.header;
    }

    get getPayload(): T {
        return this.payload;
    }

    get getEventType(): W3bStreamEventType {
        return this.eventType;
    }
}