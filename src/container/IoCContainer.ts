import Component from "../Component.js";


export default interface IoCContainer {

    initializeComponents(): void;

    register<T extends Component>(name: string, instance: T): void;

    resolve<T extends Component>(name: string): T;

}