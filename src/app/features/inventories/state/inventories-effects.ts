import { EffectsFactoryService } from "@core/services";
import { RequestClient } from "@core/client";
import { createEffect } from '@ngrx/effects';
import * as actions from './actions';
import { EffectRequestConfig, EffectActionsConfig, EffectConfigModel } from '@core/types';
import { environment } from '@environments/environment';
export class InventoriesEffects {
  constructor(
    private effectFactory: EffectsFactoryService,
    private requestClient: RequestClient
  ) {}

  saveInventories$ = createEffect(() => {
    const { SAVE_INVENTORIES, SAVE_INVENTORIES_SUCCESS, SAVE_INVENTORIES_FAIL} = actions;

    const effectReqConfig = new EffectRequestConfig(this.requestClient, 'save');
    const actionsConfig = new EffectActionsConfig(
      SAVE_INVENTORIES,
      SAVE_INVENTORIES_SUCCESS,
      SAVE_INVENTORIES_FAIL
    );
    const config = new EffectConfigModel(
      effectReqConfig,
      actionsConfig,
      `${environment.host}/inventories`
    );

    return this.effectFactory.create(config);
  });
}
