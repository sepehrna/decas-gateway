import IoCContainer from "./IoCContainer.js";
import Component from "../Component.js";
import ConfigurationServices from "../domain/ConfigurationServices.js";
import Configuration from "../entity/configuration/Configuration.js";
import BlockchainServices from "../domain/BlockchainServices.js";
import BlockchainServicesImpl from "../service/BlockchainServicesImpl.js";
import OntologyRepository from "../repository/OntologyRepository.js";
import OriginTrailDkgServices from "../service/OriginTrailDkgServices.js";
import KnowledgeGraphServices from "../domain/KnowledgeGraphServices.js";
import ApplicationServices from "../domain/ApplicationServices.js";
import {Role} from "../enum/Role.js";
import W3bStreamMonitorServicesSimulator from "../service/W3bStreamMonitorServicesTester.js";
import ConfigurationRepository from "../repository/ConfigurationRepository.js";
import FileBasedConfigurationServices from "../service/FileBasedConfigurationServices.js";
import {DefaultConfigurationServices} from "../service/DefaultConfigurationServices.js";
import {StartupMode} from "../enum/StartupMode.js";


export default class DefaultContainer implements IoCContainer {

    private static instance: DefaultContainer | undefined;

    public static getInstance(): IoCContainer {
        if (!this.instance) {
            this.instance = new DefaultContainer();
        }
        return this.instance;
    }

    private components: Map<string, Component>;

    constructor() {
        this.components = new Map();
    }

    public initializeComponents(): void {
        const configurationServices: ConfigurationServices = this.initConfigurations();
        const configuration: Configuration | undefined = configurationServices.getConfiguration();

        if (configuration) {
            const blockchainServices: BlockchainServices = new BlockchainServicesImpl(configurationServices);
            this.register(BlockchainServices.getComponentName(), blockchainServices);

            const ontologyRepository: OntologyRepository =
                new OntologyRepository(configuration.asset.sourceOntology
                    , configuration.asset.filePath
                    , configuration.asset.assetUal
                    , configuration.asset.autoCreate
                    , configuration.asset.contentType);
            this.register(OntologyRepository.getComponentName(), ontologyRepository);

            const knowledgeGraphServices: KnowledgeGraphServices = new OriginTrailDkgServices(configurationServices, ontologyRepository)
            this.register(KnowledgeGraphServices.getComponentName(), knowledgeGraphServices);

            let applicationServices: ApplicationServices | null = null;
            if (configuration.role === Role.MONITOR) {
                if (configuration.mode === StartupMode.SIMULATION) {
                    applicationServices = new W3bStreamMonitorServicesSimulator(configuration.simulationDataPath, configuration.w3bStreamClient.deviceId, configuration.interval);
                    this.register(ApplicationServices.getComponentName(), applicationServices);
                }
            }
        }
    }

    private initConfigurations(): ConfigurationServices {
        let configurationRepository: ConfigurationRepository = new ConfigurationRepository();
        let configurationServices: ConfigurationServices = new FileBasedConfigurationServices(configurationRepository);
        try {
            configurationServices.initConfiguration();
            this.register(ConfigurationRepository.getComponentName(), configurationRepository);
        } catch (e) {
            configurationServices = new DefaultConfigurationServices();
            configurationServices.initConfiguration();
        }
        this.register(ConfigurationServices.getComponentName(), configurationServices);
        return configurationServices;
    }

    register<T extends Component>(name: string, instance: T): void {
        this.components.set(name, instance);
    }

    resolve<T extends Component>(name: string): T {
        let component: Component | undefined = this.components.get(name);
        if (!component) {
            throw new Error(`Component not found: ${name}`);
        }
        return (<T>component);
    }

}