import { RestResourceFactory } from '@core/utils';
import { EffectActionsConfig } from './effect-actions-config';
import { EffectRequestConfig } from './effect-request-config';


/**
 * @description All the data needed to create an effect
 */

export class EffectConfigModel {

  private _requestOptions: any = null;
  private _resourceFactory: RestResourceFactory;


  constructor(
    public requestConfig: EffectRequestConfig,
    public actionsConfig: EffectActionsConfig,
    public resource?: string) { }

  public get requestOptions(): any {
    return this._requestOptions;
  }

  public set requestOptions(value: any) {
    this._requestOptions = value;
  }

  public get resourceFactory(): RestResourceFactory {
    return this._resourceFactory;
  }

  public set resourceFactory(value: RestResourceFactory) {
    this._resourceFactory = value;
  }

}
