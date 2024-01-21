import CommandServices from "../domain/CommandServices.js";

export default abstract class UnixBasedCommandServices extends CommandServices {
    public async isProcessExecutorValid(): Promise<boolean> {
        return !!(process.getuid && process.getuid() === 0);
    }

}