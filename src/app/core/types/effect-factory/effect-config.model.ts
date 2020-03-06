import { RequestData } from '@core/client';
import { EffectRequestConfig } from './effect-request-config';
import { EffectActionsConfig } from './effect-actions-config';

/**
 * @description All the data needed to create an effect
*/
export class EffectConfigModel {
  constructor(
    public requestConfig: EffectRequestConfig,
    public requestData: RequestData,
    public actionsConfig: EffectActionsConfig) { }
}
