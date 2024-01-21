import {promises as fs} from "fs";
import path from "path";

const baseDir: string = '/sys/bus/w1/devices/';

async function findDeviceFolder(): Promise<string> {
    console.debug('DeCAS: Finding device folder...');
    const directories: string[] = await fs.readdir(baseDir);
    const deviceFolder: string | undefined = directories.find(dir => dir.startsWith('28'));
    if (!deviceFolder) {
        console.debug('DeCAS: Device folder not found');
        throw new Error('DeCAS: Device folder not found');
    }
    return path.join(baseDir, deviceFolder);
}

async function readTempRaw(deviceFile: string): Promise<string[]> {
    const data: string = await fs.readFile(deviceFile, 'utf8');
    return data.split('\n');
}

async function readTemperatureFromDeviceFile(deviceFile: string): Promise<[number, number]> {

    console.debug('DeCAS: Reading Temperature...');

    let lines: string[] = await readTempRaw(deviceFile);

    while (lines[0].trim().slice(-3) !== 'YES') {
        await new Promise(resolve => setTimeout(resolve, 200));
        lines = await readTempRaw(deviceFile);
    }

    const equalsPos: number = lines[1].indexOf('t=');
    if (equalsPos !== -1) {
        const tempString: string = lines[1].slice(equalsPos + 2);
        console.debug('DeCAS: Temperature string is ' + tempString);
        const tempC: number = parseFloat(tempString) / 1000.0;
        const tempF: number = tempC * 9.0 / 5.0 + 32.0;
        return [tempC, tempF];
    }
    console.debug('DeCAS: Temperature reading error');
    throw new Error('DeCAS: Temperature reading error');
}

async function readTemperature(): Promise<[number, number]> {
    const deviceFolder: string = await findDeviceFolder();
    const deviceFile: string = path.join(deviceFolder, 'w1_slave');
    const [tempC, tempF] = await readTemperatureFromDeviceFile(deviceFile);
    return [tempC, tempF];
}

export {readTemperature};