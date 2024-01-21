import ConfigurationServices from "../domain/ConfigurationServices.js";
import ConfigurationRepository from "../repository/ConfigurationRepository.js";
import Configuration from "../entity/configuration/Configuration.js";

export default class FileBasedConfigurationServices extends ConfigurationServices {

    private readonly configurationRepository: ConfigurationRepository;

    constructor(configurationRepository: ConfigurationRepository) {
        super();
        this.configurationRepository = configurationRepository;
    }

    public initConfiguration(): void {
        try {
            this.configurationRepository.init();
            console.log("================== Initiation Configuration ==================");
            console.log(this.configurationRepository.getFile());
            console.log("=========================== END ==============================");
            console.log("\n");
        } catch (e) {
            throw new Error("System configuration not found.");
        }
    }

    public getConfiguration(): Configuration | undefined {
        return this.configurationRepository.getFile();
    }


}