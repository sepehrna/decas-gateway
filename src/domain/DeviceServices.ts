import Component from "../Component.js";
import Device from "../entity/device/Device.js";

export default abstract class DeviceServices implements Component {
    public static getComponentName(): string {
        return 'DeviceServices';
    }

    protected validate(platformIndividualName: string, device: Device): boolean {
        if (!platformIndividualName || platformIndividualName === "") {
            throw new Error("Platform individual name is not valid!");
        }
        if (!device || !device.individualName || device.individualName === "") {
            throw new Error("Device individual name is not valid!");
        }
        return true;
    }

    protected async establish(platformIndividualName: string, device: Device): Promise<Device> {
        let isValid: boolean;
        try {
            isValid = this.validate(platformIndividualName, device);
        } catch (e) {
            throw new Error("Device is not valid because of: " + e);
        }
        if (isValid) {
            let shook: boolean = false;
            device.id = device.id ? device.id : Math.random();
            try {
                shook = this.handshake(device);
                if (shook) {
                    device.established = true;
                    return device;
                }
            } catch (e) {
                throw new Error("Handshake failed because of: " + e);
            }
            if (!shook) {
                throw new Error("Handshake failed with unknown reason(s)!!!");
            }
        }
        throw new Error("Device validation failed with unknown reason(s)!!!");
    }

    protected abstract handshake(device: Device): boolean;

}