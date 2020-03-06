import { Injectable } from '@angular/core';
import { RequestClient } from '@core/client';
import { EffectsFactoryService } from '@core/services';
import { EffectActionsConfig, EffectConfigModel, EffectRequestConfig } from '@core/types';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { RestResourceFactory } from '@core/utils';
import {GlobalError} from '@state/index';

@Injectable()
export class UsersEffects {

  constructor(
    private effectFactory: EffectsFactoryService,
    private requestClient: RequestClient) { }

  loadUsers$ = createEffect(() => {
    const { LoadUsers, UsersLoadedSuccess } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(LoadUsers, UsersLoadedSuccess, GlobalError);
    const config = new EffectConfigModel(effectReqConfig, actionsConfig, 'https://jsonplaceholder.typicode.com/users');

    return this.effectFactory.create(config);
  });

  loadUser$ = createEffect(() => {
    const { LoadUser, UserLoadedSuccess } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(LoadUser, UserLoadedSuccess, GlobalError);

    const config = new EffectConfigModel(effectReqConfig, actionsConfig);
    config.resourceFactory = new RestResourceFactory('https://jsonplaceholder.typicode.com/users/$$0', ['id']);
    return this.effectFactory.create(config);
  });


}
// 'https://jsonplaceholder.typicode.com/users'

