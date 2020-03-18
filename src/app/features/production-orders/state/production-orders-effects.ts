import { EffectsFactoryService } from '@core/services';
import { RequestClient } from '@core/client';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { EffectRequestConfig, EffectActionsConfig, EffectConfigModel } from '@core/types';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductionOrdersEffects {
  constructor(
    private effectFactory: EffectsFactoryService,
    private requestClient: RequestClient
  ) {}

  saveClients$ = createEffect(() => {
    const { SAVE_PRODUCTION_ORDERS, SAVE_PRODUCTION_ORDERS_SUCCESS, SAVE_PRODUCTION_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'save');
    const actionsConfig = new EffectActionsConfig(
      SAVE_PRODUCTION_ORDERS,
      SAVE_PRODUCTION_ORDERS_SUCCESS,
      SAVE_PRODUCTION_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/production_orders`
    );

    return this.effectFactory.create(config);
  });

  updateProductionOrders$ = createEffect(() => {
    const { SAVE_PRODUCTION_ORDERS, SAVE_PRODUCTION_ORDERS_SUCCESS, SAVE_PRODUCTION_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'update');
    const actionsConfig = new EffectActionsConfig(
      SAVE_PRODUCTION_ORDERS,
      SAVE_PRODUCTION_ORDERS_SUCCESS,
      SAVE_PRODUCTION_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/production_orders`
    );

    return this.effectFactory.create(config);
  });
}
