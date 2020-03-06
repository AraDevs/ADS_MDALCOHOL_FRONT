import { Injectable } from '@angular/core';
import { RequestClient, RequestData } from '@core/client';
import { EffectsFactoryService } from '@core/services';
import { EffectActionsConfig, EffectConfigModel, EffectRequestConfig } from '@core/types';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';

@Injectable()
export class UsersEffects {

  constructor(
    private effectFactory: EffectsFactoryService,
    private requestClient: RequestClient) { }

  loadUsers$ = createEffect(() => {
    const { LoadUsers, UsersLoadedSuccess } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(LoadUsers, UsersLoadedSuccess, null);
    const requestData = new RequestData('https://jsonplaceholder.typicode.com/users');

    const config = new EffectConfigModel(effectReqConfig, requestData, actionsConfig);
    return this.effectFactory.create(config);
  });


}


