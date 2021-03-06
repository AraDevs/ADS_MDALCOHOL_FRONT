import { Injectable } from '@angular/core';
import { RequestClient } from '@core/client';
import { EffectsFactoryService } from '@core/services';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { EffectRequestConfig, EffectActionsConfig, EffectConfigModel } from '@core/types';
import { environment } from '@environments/environment';
import { RestResourceFactory } from '@core/utils';

@Injectable()
export class ClientsEffects {
  constructor(private effectFactory: EffectsFactoryService, private requestClient: RequestClient) {}

  saveClients$ = createEffect(() => {
    const { SAVE_CLIENTS, SAVE_CLIENTS_SUCCESS, SAVE_CLIENTS_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'post');
    const actionsConfig = new EffectActionsConfig(
      SAVE_CLIENTS,
      SAVE_CLIENTS_SUCCESS,
      SAVE_CLIENTS_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/clients`
    );

    return this.effectFactory.create(config);
  });

  updateClients$ = createEffect(() => {
    const { UPDATE_CLIENTS, UPDATE_CLIENTS_SUCCESS, UPDATE_CLIENTS_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'put');
    const actionsConfig = new EffectActionsConfig(
      UPDATE_CLIENTS,
      UPDATE_CLIENTS_SUCCESS,
      UPDATE_CLIENTS_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/clients`
    );

    return this.effectFactory.create(config);
  });

  saveSpecialPrice$ = createEffect(() => {
    const { SAVE_SPECIAL_PRICE, SAVE_SPECIAL_PRICE_SUCCESS, SAVE_SPECIAL_PRICE_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'post');
    const actionsConfig = new EffectActionsConfig(
      SAVE_SPECIAL_PRICE,
      SAVE_SPECIAL_PRICE_SUCCESS,
      SAVE_SPECIAL_PRICE_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/special_prices`
    );

    return this.effectFactory.create(config);
  });

  loadSpecialPrices$ = createEffect(() => {
    const { LOAD_SPECIAL_PRICE, SPECIAL_PRICE_LOADED_SUCCESS, SPECIAL_PRICE_LOADED_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      LOAD_SPECIAL_PRICE,
      SPECIAL_PRICE_LOADED_SUCCESS,
      SPECIAL_PRICE_LOADED_FAIL
    );
    const config = new EffectConfigModel(effectReqConfig, actionsConfig);

    const template = `${environment.host}/special_prices/clients/$$0`;
    config.resourceFactory = new RestResourceFactory(template, ['id']);

    return this.effectFactory.create(config);
  });
}
