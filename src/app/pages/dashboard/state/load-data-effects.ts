import { Injectable } from '@angular/core';
import { RequestClient } from '@core/client';
import { EffectsFactoryService } from '@core/services';
import { EffectActionsConfig, EffectConfigModel, EffectRequestConfig } from '@core/types';
import { RestResourceFactory } from '@core/utils';
import { environment } from '@environments/environment';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';

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

  loadClientsActive$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_CLIENTS_ACTIVE,
      actions.CLIENTS_ACTIVE_LOADED_SUCCESS,
      actions.CLIENTS_ACTIVE_LOADED_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/clients/active`
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

  loadRawMaterials$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_RAW_MATERIALS,
      actions.RAW_MATERIALS_LOADED_SUCCESS,
      actions.RAW_MATERIALS_LOADED_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/inventories/raw_materials`
    );

    return this.effectFactory.create(config);
  });

  loadFinalMaterials$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_FINAL_MATERIALS,
      actions.FINAL_MATERIALS_LOADED_SUCCESS,
      actions.FINAL_MATERIALS_LOADED_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/inventories/raw_materials`
    );

    return this.effectFactory.create(config);
  });

  loadFinalProducts$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_FINAL_PRODUCTS,
      actions.FINAL_PRODUCTS_LOADED_SUCCESS,
      actions.FINAL_PRODUCTS_LOADED_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/inventories/final_products`
    );

    return this.effectFactory.create(config);
  });

  loadBills$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_BILLS,
      actions.BILLS_LOADED_SUCCESS,
      actions.BILLS_LOADED_FAIL
    );
    const config = new EffectConfigModel(effectReqConfig, actionsConfig);

    const template = `${environment.host}/bills/$$0`;
    config.resourceFactory = new RestResourceFactory(template, ['state']);

    return this.effectFactory.create(config);
  });

  loadInventoriesByClient$ = createEffect(() => {
    const {
      LOAD_INVENTORY_BY_CLIENT,
      INVENTORY_BY_CLIENT_LOADED_SUCCESS,
      INVENTORY_BY_CLIENT_LOADED_FAIL,
    } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      LOAD_INVENTORY_BY_CLIENT,
      INVENTORY_BY_CLIENT_LOADED_SUCCESS,
      INVENTORY_BY_CLIENT_LOADED_FAIL
    );
    const config = new EffectConfigModel(effectReqConfig, actionsConfig);

    const template = `${environment.host}/inventories/client/$$0`;
    config.resourceFactory = new RestResourceFactory(template, ['id']);

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

  loadPurchases$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_PURCHASE,
      actions.PURCHASE_LOADED_SUCCESS,
      actions.PURCHASE_LOADED_FAIL
    );
    const config = new EffectConfigModel(effectReqConfig, actionsConfig);

    const template = `${environment.host}/purchases/$$0`;
    config.resourceFactory = new RestResourceFactory(template, ['state']);

    return this.effectFactory.create(config);
  });
}
