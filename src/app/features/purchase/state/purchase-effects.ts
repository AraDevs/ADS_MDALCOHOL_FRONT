import { EffectsFactoryService } from '@core/services';
import { RequestClient } from '@core/client';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { EffectRequestConfig, EffectActionsConfig, EffectConfigModel } from '@core/types';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { RestResourceFactory } from '@core/utils';

@Injectable()
export class PurchasesEffects {
  constructor(private effectFactory: EffectsFactoryService, private requestClient: RequestClient) {}

  savePurchases$ = createEffect(() => {
    const { SAVE_PURCHASES, SAVE_PURCHASES_SUCCESS, SAVE_PURCHASES_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'save');
    const actionsConfig = new EffectActionsConfig(
      SAVE_PURCHASES,
      SAVE_PURCHASES_SUCCESS,
      SAVE_PURCHASES_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/purchases`
    );

    return this.effectFactory.create(config);
  });

  updatePurchases$ = createEffect(() => {
    const { UPDATE_PURCHASES, UPDATE_PURCHASES_SUCCESS, UPDATE_PURCHASES_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'update');
    const actionsConfig = new EffectActionsConfig(
      UPDATE_PURCHASES,
      UPDATE_PURCHASES_SUCCESS,
      UPDATE_PURCHASES_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/purchases`
    );

    return this.effectFactory.create(config);
  });

  loadDetailBillt$ = createEffect(() => {
    const {
      LOAD_PURCHASE_DETAIL,
      PURCHASE_DETAIL_LOADED_SUCCESS,
      PURCHASE_DETAIL_LOADED_FAIL,
    } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      LOAD_PURCHASE_DETAIL,
      PURCHASE_DETAIL_LOADED_SUCCESS,
      PURCHASE_DETAIL_LOADED_FAIL
    );
    const config = new EffectConfigModel(effectReqConfig, actionsConfig);

    const template = `${environment.host}/purchases/$$0`;
    config.resourceFactory = new RestResourceFactory(template, ['id']);

    return this.effectFactory.create(config);
  });
}
