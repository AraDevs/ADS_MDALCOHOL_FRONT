import { Injectable } from '@angular/core';
import { RequestClient } from '@core/client';
import { EffectsFactoryService } from '@core/services';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { EffectActionsConfig, EffectConfigModel, EffectRequestConfig } from '@core/types';
import { environment } from '@environments/environment';


@Injectable()
export class ProvidersEffects {
  constructor(private effectFactory: EffectsFactoryService, private requestClient: RequestClient) {}

  saveProviders$ = createEffect(() => {
    const { SAVE_PROVIDERS, SAVE_PROVIDERS_SUCCESS, SAVE_PROVIDERS_FAIL} = actions;

    const effectReqConfig = new EffectRequestConfig(
      this.requestClient, 'save');
    const actionsConfig = new EffectActionsConfig(
      SAVE_PROVIDERS,
      SAVE_PROVIDERS_SUCCESS,
      SAVE_PROVIDERS_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/providers`
    );

    return this.effectFactory.create(config);
  });
}
