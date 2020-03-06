/**
 * @description Represent all the data needed to perform a request
 */
export class RequestData<T = any> {
  private _data: any = null;
  private _options: T = null;

  constructor(public resource: string) { }

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
}
