import { Injectable } from '@angular/core';
import { RequestClient } from '@core/client';
import { EffectsFactoryService } from '@core/services';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { EffectRequestConfig, EffectActionsConfig, EffectConfigModel } from '@core/types';
import { environment } from '@environments/environment';

@Injectable()
export class ClientsEffects {
  constructor(private effectFactory: EffectsFactoryService, private requestClient: RequestClient) {}

  saveClients$ = createEffect(() => {
    const { SAVE_CLIENTS, SAVE_CLIENTS_SUCCESS, SAVE_CLIENTS_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'save');
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

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'update');
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
}
