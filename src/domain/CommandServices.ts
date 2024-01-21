import Component from "../Component.js";

export default abstract class CommandServices implements Component {
    public static getComponentName(): string {
        return 'CommandServices';
    }

    abstract enableHardware(): void;

    abstract isProcessExecutorValid(): Promise<boolean>;

}