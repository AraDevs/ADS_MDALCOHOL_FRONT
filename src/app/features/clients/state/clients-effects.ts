import { Injectable } from '@angular/core';
import { RequestClient } from '@core/client';
import { EffectsFactoryService } from '@core/services';
import { EffectActionsConfig, EffectConfigModel, EffectRequestConfig } from '@core/types';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { RestResourceFactory } from '@core/utils';
import { environment } from '@environments/environment';

@Injectable()
export class ClientsEffects {

  constructor(
    private effectFactory: EffectsFactoryService,
    private requestClient: RequestClient) { }

  loadSellers$ = createEffect(() => {
    const { LoadSellers, SellersLoadedSuccess, SellersLoadedFail } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(LoadSellers, SellersLoadedSuccess, SellersLoadedFail);
    const config = new EffectConfigModel(effectReqConfig, actionsConfig, `${environment.host}/sellers`);

    return this.effectFactory.create(config);
  });
}


