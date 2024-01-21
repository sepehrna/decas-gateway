import Component from "../Component.js";

export default abstract class KnowledgeGraphServices implements Component {

    public static getComponentName(): string {
        return 'KnowledgeGraphServices';
    }

    public abstract initializeAsset(): Promise<void>;
}