import {W3bStreamEventType} from "../../enum/W3bStreamEventType.js";
export default class Header {

    private event_type: W3bStreamEventType = W3bStreamEventType.DeviceEstablishmentRequest;
    private pub_id:string = "";
    private token: string = "";
    private pub_time: string = "";
    private device_id: string = "";
    constructor(event_type: W3bStreamEventType, pub_id: string, token: string, pub_time: string, device_id: string) {
        this.event_type = event_type;
        this.pub_id = pub_id;
        this.token = token;
        this.pub_time = pub_time;
        this.device_id = device_id;
    }

}