import { Injectable } from '@angular/core';
import { RequestClient } from '@core/client';
import { EffectsFactoryService } from '@core/services';
import { EffectActionsConfig, EffectConfigModel, EffectRequestConfig } from '@core/types';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { environment } from '@environments/environment';

@Injectable()
export class SellersEffects {
  constructor(private effectFactory: EffectsFactoryService, private requestClient: RequestClient) {}

  loadSellers$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_SELLERS,
      actions.SELLERS_LOADED_SUCCESS,
      actions.SELLERS_LOADED_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/sellers`
    );

    return this.effectFactory.create(config);
  });

  saveSellers$ = createEffect(() => {
    const { SAVE_SELLERS, SAVE_SELLERS_SUCCESS, SAVE_SELLERS_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'save');
    const actionsConfig = new EffectActionsConfig(
      SAVE_SELLERS,
      SAVE_SELLERS_SUCCESS,
      SAVE_SELLERS_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/sellers`
    );

    return this.effectFactory.create(config);
  });
}
