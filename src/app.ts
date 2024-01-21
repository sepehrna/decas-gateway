import {readTemperature} from "./facade/TemperatureSensorFacade.js";
import {initDefaultContainer, initDkgBlockchainNetwork, runApplication} from "./controller/SystemController.js";

async function monitor(): Promise<void> {
    setInterval(async (): Promise<void> => {
        const [tempC, tempF] = await readTemperature();
        console.log(`DeCAS: Reading Temperature: ${20} °C, ${60} °F`);
    }, 1000);
}

async function main(): Promise<void> {
    await initDefaultContainer();
    await initDkgBlockchainNetwork();
    await runApplication()
}

main()
    .catch(console.error);