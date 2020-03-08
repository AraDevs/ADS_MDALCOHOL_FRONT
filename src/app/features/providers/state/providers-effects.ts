import { Injectable } from '@angular/core';
import { EffectsFactoryService } from '@core/services';
import { RequestClient } from '@core/client';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { EffectRequestConfig, EffectActionsConfig, EffectConfigModel } from '@core/types';
import { environment } from '@environments/environment';

@Injectable()
export class ProvidersEffects {
  constructor(private effectFactory: EffectsFactoryService, private requestClient: RequestClient) {}

  loadProviders$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_PROVIDERS,
      actions.PROVIDERS_LOADED_SUCCESS,
      actions.PROVIDERS_LOADED_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/providers`
    );

    return this.effectFactory.create(config);
  });
}
