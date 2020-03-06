import { RequestClient } from '@core/client';

/**
 * @description Represent the request client that the effect will be use
 */
export class EffectRequestConfig {
  constructor(public requestClient: RequestClient, public method: string) { }
}
