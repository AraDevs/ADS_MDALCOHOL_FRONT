/**
 * @description Represent all the data needed to perform a request
 */
export class RequestData<T = any> {
  private _data: any = null;
  private _options: T = null;
  private _resource: string;

  constructor() {}

  public get data(): any {
    return this._data;
  }

  public set data(value: any) {
    this._data = value;
  }

  public get options(): T {
    return this._options;
  }
  public set options(value: T) {
    this._options = value;
  }

  public get resource(): string {
    return this._resource;
  }

  public set resource(value: string) {
    this._resource = value;
  }
}
