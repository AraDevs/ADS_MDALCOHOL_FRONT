import { Injectable } from '@angular/core';
import { RequestClient } from '@core/client';
import { EffectsFactoryService } from '@core/services';
import { EffectActionsConfig, EffectConfigModel, EffectRequestConfig } from '@core/types';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { RestResourceFactory } from '@core/utils';

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
      'https://jsonplaceholder.typicode.com/users'
    );

    return this.effectFactory.create(config);
  });

  loadUser$ = createEffect(() => {
    const { LOAD_USER, USER_LOADED_SUCCESS, USER_LOADED_FAIL } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(LOAD_USER, USER_LOADED_SUCCESS, USER_LOADED_FAIL);

    const config = new EffectConfigModel(effectReqConfig, actionsConfig);
    config.resourceFactory = new RestResourceFactory(
      'https://jsonplaceholder.typicode.com/users/$$0',
      ['id']
    );
    return this.effectFactory.create(config);
  });
}
