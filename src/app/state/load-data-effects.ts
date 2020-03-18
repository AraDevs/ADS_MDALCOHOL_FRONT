import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { EffectsFactoryService } from '@core/services';
import { RequestClient } from '@core/client';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { EffectRequestConfig, EffectActionsConfig, EffectConfigModel } from '@core/types';

/**
 * Load al the data that is shared between lazy modules
 */
@Injectable()
export class LoadDataEffects {
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

  loadDepartments$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_DEPARTMENTS,
      actions.DEPARTMENTS_LOADED_SUCCESS,
      actions.DEPARTMENTS_LOADED_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/departments`
    );

    return this.effectFactory.create(config);
  });

  loadMunicipalities$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_MUNICIPALITIES,
      actions.MUNICIPALITIES_LOADED_SUCCESS,
      actions.MUNICIPALITIES_LOADED_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/municipalities`
    );

    return this.effectFactory.create(config);
  });

  loadClients$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_CLIENTS,
      actions.CLIENTS_LOADED_SUCCESS,
      actions.CLIENTS_LOADED_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/clients`
    );

    return this.effectFactory.create(config);
  });

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

  loadInventories$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_INVENTORIES,
      actions.INVENTORIES_LOADED_SUCCESS,
      actions.INVENTORIES_LOADED_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/inventories`
    );

    return this.effectFactory.create(config);
  });

  loadProductionOrders$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_PRODUCTION_ORDERS,
      actions.PRODUCTION_ORDERS_LOADED_SUCCESS,
      actions.PRODUCTION_ORDERS_LOADED_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/production_orders`
    );

    return this.effectFactory.create(config);
  });
}
