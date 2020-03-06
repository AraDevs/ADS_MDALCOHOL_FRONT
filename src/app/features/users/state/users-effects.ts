import { Injectable } from '@angular/core';
import { RequestClient } from '@core/client';
import { EffectsFactoryService } from '@core/services';
import { EffectActionsConfig, EffectConfigModel, EffectRequestConfig } from '@core/types';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { RestResourceFactory } from '@core/utils';

@Injectable()
export class UsersEffects {

  constructor(
    private effectFactory: EffectsFactoryService,
    private requestClient: RequestClient) { }

  loadUsers$ = createEffect(() => {
    const { LoadUsers, UsersLoadedSuccess, LoadUsersFail } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(LoadUsers, UsersLoadedSuccess, LoadUsersFail);
    const config = new EffectConfigModel(effectReqConfig, actionsConfig, 'https://jsonplaceholder.typicode.com/userss');

    return this.effectFactory.create(config);
  });

  loadUser$ = createEffect(() => {
    const { LoadUser, UserLoadedSuccess, LoadUserFaild } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(LoadUser, UserLoadedSuccess, LoadUserFaild);

    const config = new EffectConfigModel(effectReqConfig, actionsConfig);
    config.resourceFactory = new RestResourceFactory('https://jsonplaceholder.typicode.com/users/$$0', ['id']);
    return this.effectFactory.create(config);
  });

}


