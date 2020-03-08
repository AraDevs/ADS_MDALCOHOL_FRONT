import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { EffectsFactoryService } from '@core/services';
import { RequestClient } from '@core/client';
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { EffectRequestConfig, EffectActionsConfig, EffectConfigModel } from '@core/types';

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
}
