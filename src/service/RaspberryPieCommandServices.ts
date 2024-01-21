import UnixBasedCommandServices from "./UnixBasedCommandServices.js";
import {execSync} from "child_process";

export default class RaspberryPieCommandServices extends UnixBasedCommandServices {
    enableHardware(): void {
        // Enable 1-Wire devices
        execSync('modprobe w1-gpio');
        execSync('modprobe w1-therm');
    }
}