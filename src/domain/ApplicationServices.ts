import Component from "../Component.js";
export default abstract class ApplicationServices implements Component {

    public static getComponentName(): string {
        return 'BlockchainService';
    }

    public abstract run(): Promise<void>;
}