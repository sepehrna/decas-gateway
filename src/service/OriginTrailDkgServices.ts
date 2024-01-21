import KnowledgeGraphServices from "../domain/KnowledgeGraphServices.js";
import ConfigurationServices from "../domain/ConfigurationServices.js";
import OntologyRepository from "../repository/OntologyRepository.js";
import Configuration from "../entity/configuration/Configuration.js";


export default class OriginTrailDkgServices extends KnowledgeGraphServices {

    private readonly configurationServices: ConfigurationServices;
    private readonly ontologyRepository: OntologyRepository;

    constructor(configurationServices: ConfigurationServices, ontologyRepository: OntologyRepository) {
        super();
        this.configurationServices = configurationServices;
        this.ontologyRepository = ontologyRepository;
    }

    public async initializeAsset(): Promise<void> {
        let configuration: Configuration | undefined = this.configurationServices.getConfiguration();
        if (!configuration) {
            throw new Error("System configuration has not been initialized.");
        }
        await this.ontologyRepository.init();
    }
}