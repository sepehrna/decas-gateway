import ConfigurationServices from "../domain/ConfigurationServices.js";
import Configuration from "../entity/configuration/Configuration.js";

export class DefaultConfigurationServices extends ConfigurationServices {

    private configuration: Configuration | undefined;

    public getConfiguration(): Configuration | undefined {
        return this.configuration;
    }

    public initConfiguration(): void {
        this.configuration = JSON.parse("{\n" +
            "  \"operationType\": \"DEVICE\",\n" +
            "  \"platform\": {\n" +
            "    \"controllerUnit\": {\n" +
            "      \"type\": \"RaspberryPi\",\n" +
            "      \"version\": \"4\",\n" +
            "      \"model\": \"B\"\n" +
            "    },\n" +
            "    \"sensors\": [\n" +
            "    ]\n" +
            "  },\n" +
            "  \"dkg\": {\n" +
            "    \"endpoint\": \"http://127.0.0.1\",\n" +
            "    \"port\": 8900,\n" +
            "    \"blockchain\": {\n" +
            "      \"name\": \"hardhat\",\n" +
            "      \"publicKey\": \"\",\n" +
            "      \"privateKey\": \"\"\n" +
            "    }\n" +
            "  },\n" +
            "  \"asset\": {\n" +
            "    \"autoCreate\": false,\n" +
            "    \"assetUal\": \"\"\n" +
            "  }\n" +
            "}");
    }

}