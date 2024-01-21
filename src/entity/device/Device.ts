export default abstract class Device {

    private _id: number;
    private readonly _individualName: string;
    private readonly _type: string;
    private _established: boolean = false;

    protected constructor(id: number, individualName: string, type: string) {
        this._id = id;
        this._individualName = individualName;
        this._type = type;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get individualName(): string {
        return this._individualName;
    }

    get type(): string {
        return this._type;
    }

    get established(): boolean {
        return this._established;
    }

    set established(value: boolean) {
        this._established = value;
    }
}