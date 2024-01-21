import Device from "./Device.js";
import ControllerUnit from "./ControllerUnit.js";
import Sensor from "./Sensor.js";
import Actuator from "./Actuator.js";

export default class Platform extends Device {

    private readonly _controllerUnit: ControllerUnit;
    private readonly _sensors: Sensor[];
    private readonly _actuators: Actuator[];

    constructor(id: number, individualName: string, type: string, controllerUnit: ControllerUnit, sensors: Sensor[], actuators: Actuator[]) {
        super(id, individualName, type);
        this._controllerUnit = controllerUnit;
        this._sensors = sensors;
        this._actuators = actuators;
    }

    get controllerUnit(): ControllerUnit {
        return this._controllerUnit;
    }

    get sensors(): Sensor[] {
        return this._sensors;
    }

    get actuators(): Actuator[] {
        return this._actuators;
    }

}