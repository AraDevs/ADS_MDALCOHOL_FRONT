import { Injectable } from '@angular/core';
import { RequestClient } from '@core/client';
import { EffectsFactoryService } from '@core/services';
import { EffectActionsConfig, EffectConfigModel, EffectRequestConfig } from '@core/types';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { environment } from '@environments/environment';

@Injectable()
export class SellersEffects {

  constructor(
    private effectFactory: EffectsFactoryService,
    private requestClient: RequestClient) { }

  loadSellers$ = createEffect(() => {
    const { LoadSellers, SellersLoadedSuccess, SellerLoadedFail } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'get');
    const actionsConfig = new EffectActionsConfig(LoadSellers, SellersLoadedSuccess, SellerLoadedFail);
    const config = new EffectConfigModel(effectReqConfig, actionsConfig, `${environment.host}/sellers`);

    return this.effectFactory.create(config);
  });

  saveSellers$ = createEffect(() => {
    const { SaveSellers, SaveSellersLoadedSuccess, SaveSellerLoadedFail } = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'save');
    const actionsConfig = new EffectActionsConfig(SaveSellers, SaveSellersLoadedSuccess, SaveSellerLoadedFail);
    const config = new EffectConfigModel(effectReqConfig, actionsConfig, `${environment.host}/sellers`);

    return this.effectFactory.create(config);
  });

}