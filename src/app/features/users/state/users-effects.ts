import { Injectable } from '@angular/core';
import { RequestClient } from '@core/client';
import { EffectsFactoryService } from '@core/services';
import { EffectActionsConfig, EffectConfigModel, EffectRequestConfig } from '@core/types';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { RestResourceFactory } from '@core/utils';
import { environment } from '@environments/environment';

@Injectable()
export class UsersEffects {
  constructor(private effectFactory: EffectsFactoryService, private requestClient: RequestClient) {}

  loadUsers$ = createEffect(() => {
    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(
      actions.LOAD_USERS,
      actions.USERS_LOADED_SUCCESS,
      actions.USERS_LOADED_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/users`
    );

    return this.effectFactory.create(config);
  });

  saveUsers$ = createEffect(() => {
    const { SAVE_USERS, SAVE_USERS_SUCCESS, SAVE_USERS_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'save');
    const actionsConfig = new EffectActionsConfig(
      SAVE_USERS,
      SAVE_USERS_SUCCESS,
      SAVE_USERS_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/users`
    );

    return this.effectFactory.create(config);
  });

  updateUsers$ = createEffect(() => {
    const { UPDATE_USERS, UPDATE_USERS_SUCCESS, UPDATE_USERS_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'update');
    const actionsConfig = new EffectActionsConfig(
      UPDATE_USERS,
      UPDATE_USERS_SUCCESS,
      UPDATE_USERS_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/users`
    );

    return this.effectFactory.create(config);
  });
}
