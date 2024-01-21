import Component from "../Component.js";

export default abstract class BlockchainServices implements Component {

    public static getComponentName(): string {
        return 'BlockchainServices';
    }

    public abstract initBlockchainNetwork(): Promise<void>;
}