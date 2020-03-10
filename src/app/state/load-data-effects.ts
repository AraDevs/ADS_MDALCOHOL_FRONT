import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { EffectsFactoryService } from '@core/services';
import { RequestClient } from '@core/client';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { EffectRequestConfig, EffectActionsConfig, EffectConfigModel } from '@core/types';
import { CLIENTS_LOADED_FAIL } from './actions';

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
}