import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';

// Enable 1-Wire devices
execSync('modprobe w1-gpio');
execSync('modprobe w1-therm');

const baseDir = '/sys/bus/w1/devices/';

async function findDeviceFolder(): Promise<string> {
    const directories = await fs.readdir(baseDir);
    const deviceFolder = directories.find(dir => dir.startsWith('28'));
    if (!deviceFolder) {
        throw new Error('Device folder not found');
    }
    return path.join(baseDir, deviceFolder);
}

async function readTempRaw(deviceFile: string): Promise<string[]> {
    const data = await fs.readFile(deviceFile, 'utf8');
    return data.split('\n');
}

async function readTemp(deviceFile: string): Promise<[number, number]> {
    let lines = await readTempRaw(deviceFile);

    while (lines[0].trim().slice(-3) !== 'YES') {
        await new Promise(resolve => setTimeout(resolve, 200));
        lines = await readTempRaw(deviceFile);
    }

    const equalsPos = lines[1].indexOf('t=');
    if (equalsPos !== -1) {
        const tempString = lines[1].slice(equalsPos + 2);
        const tempC = parseFloat(tempString) / 1000.0;
        const tempF = tempC * 9.0 / 5.0 + 32.0;
        return [tempC, tempF];
    }

    throw new Error('Temperature reading error');
}

async function main() {

    console.log('DeCAS: Reading Temperature');
    const deviceFolder = await findDeviceFolder();
    const deviceFile = path.join(deviceFolder, 'w1_slave');

    setInterval(async () => {
        const [tempC, tempF] = await readTemp(deviceFile);
        console.log(`Temperature: ${tempC} °C, ${tempF} °F`);
    }, 1000);
}

main().catch(console.error);