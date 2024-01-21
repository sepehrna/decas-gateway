import BlockchainServices from "../domain/BlockchainServices.js";
import ConfigurationServices from "../domain/ConfigurationServices.js";
import Configuration from "../entity/configuration/Configuration.js";
import {initOriginTrailNode} from "../facade/OriginTrailFacade.js";
import {initW3bStreamClient} from "../facade/W3bStreamFacade.js";


export default class BlockchainServicesImpl extends BlockchainServices {

    private readonly configurationServices: ConfigurationServices;

    constructor(configurationServices: ConfigurationServices) {
        super();
        this.configurationServices = configurationServices;
    }

    public async initBlockchainNetwork(): Promise<void> {
        let configuration: Configuration | undefined = this.configurationServices.getConfiguration();
        if (!configuration || !configuration?.dkg) {
            throw new Error("Blockchain configs has not found.")
        }
        await initOriginTrailNode(configuration.dkg);
        await initW3bStreamClient(configuration.w3bStreamClient);
    }

}