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

  saveSellers$ = createEffect(() => {
    const { SAVE_SELLERS, SAVE_SELLERS_SUCCESS, SAVE_SELLERS_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'post');
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

  updateSellers$ = createEffect(() => {
    const { UPDATE_SELLERS, UPDATE_SELLERS_SUCCESS, UPDATE_SELLERS_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'put');
    const actionsConfig = new EffectActionsConfig(
      UPDATE_SELLERS,
      UPDATE_SELLERS_SUCCESS,
      UPDATE_SELLERS_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/sellers`
    );

    return this.effectFactory.create(config);
  });
}
