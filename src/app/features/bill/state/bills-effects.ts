import { Injectable } from '@angular/core';
import { EffectsFactoryService } from '@core/services';
import { RequestClient } from '@core/client';
import { createEffect } from '@ngrx/effects';
import { EffectRequestConfig, EffectActionsConfig, EffectConfigModel } from '@core/types';
import * as actions from './actions';
import { environment } from '@environments/environment';
import { RestResourceFactory } from '@core/utils';

@Injectable()
export class BillsEffects {
  constructor(
    private effectFactory: EffectsFactoryService,
    private requestClient: RequestClient
  ) {}

  saveBills$ = createEffect(() => {
    const { SAVE_BILLS, SAVE_BILLS_SUCCESS, SAVE_BILLS_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'save');
    const actionsConfig = new EffectActionsConfig(
      SAVE_BILLS,
      SAVE_BILLS_SUCCESS,
      SAVE_BILLS_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/bills`
    );

    return this.effectFactory.create(config);
  });

  updateBills$ = createEffect(() => {
    const { UPDATE_BILLS, UPDATE_BILLS_SUCCESS, UPDATE_BILLS_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'update');
    const actionsConfig = new EffectActionsConfig(
      UPDATE_BILLS,
      UPDATE_BILLS_SUCCESS,
      UPDATE_BILLS_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/bills`
    );

    return this.effectFactory.create(config);
  });

  loadInventoriesByClient$ = createEffect(() => {
    const { LOAD_INVENTORY_BY_CLIENT, INVENTORY_BY_CLIENT_LOADED_SUCCESS, INVENTORY_BY_CLIENT_LOADED_FAIL } = actions;

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
}
