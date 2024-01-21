import Component from "../Component.js";
import Configuration from "../entity/configuration/Configuration.js";
export default abstract class ConfigurationServices implements Component {

    public static getComponentName(): string {
        return 'ConfigurationServices';
    }

    public abstract initConfiguration(): void;

    public abstract getConfiguration(): Configuration | undefined;

}