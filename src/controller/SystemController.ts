import DefaultContainer from "../container/DefaultContainer.js";
import BlockchainServices from "../domain/BlockchainServices.js";
import KnowledgeGraphServices from "../domain/KnowledgeGraphServices.js";
import ApplicationServices from "../domain/ApplicationServices.js";


async function initDefaultContainer(): Promise<void> {
    DefaultContainer.getInstance().initializeComponents();
}

async function initDkgBlockchainNetwork(): Promise<void> {
    const blockchainServices: BlockchainServices = DefaultContainer
        .getInstance()
        .resolve<BlockchainServices>(BlockchainServices.getComponentName());
    await blockchainServices.initBlockchainNetwork();
}

async function initializeAsset(): Promise<void> {
    const knowledgeGraphServices: KnowledgeGraphServices = DefaultContainer
        .getInstance()
        .resolve<KnowledgeGraphServices>(KnowledgeGraphServices.getComponentName());
    await knowledgeGraphServices.initializeAsset();
}

async function runApplication(): Promise<void> {
    const applicationServices: ApplicationServices = DefaultContainer
        .getInstance()
        .resolve<ApplicationServices>(ApplicationServices.getComponentName());
    await applicationServices.run();
}

export {initDefaultContainer, initDkgBlockchainNetwork, initializeAsset, runApplication};