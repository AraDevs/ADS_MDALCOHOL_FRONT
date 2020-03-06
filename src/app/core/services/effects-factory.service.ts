import { Injectable } from '@angular/core';
import { ResponseClientResultModel } from '@core/client';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EffectConfigModel, EffectActionsConfig } from '@core/types';
import { TypedAction } from '@ngrx/store/src/models';


type Action = { data: any; } & TypedAction<string>;

@Injectable({ providedIn: 'root' })
export class EffectsFactoryService {
  constructor(private actions$: Actions) { }


  create(config: EffectConfigModel): Observable<Action> {
    const { requestConfig, requestData, actionsConfig } = config;
    const { method, requestClient } = requestConfig;
    const { actionToListen } = actionsConfig;

    return this.actions$.pipe(
      ofType(actionToListen),
      switchMap((action: { type: string, data?: any; }) => {
        const isDataAction = !!action.data;
        if (isDataAction) {
          requestData.data = action.data;
        }

        const { result } = requestClient[method]<any>(requestData);
        return result.pipe(
          map((res: Partial<ResponseClientResultModel<any>>) =>
            this.getAction(res, actionsConfig))
        ) as Observable<Action>;
      })
    );
  }

  // Returns success action or fail action that will be dispatched to the store
  private getAction(result: Partial<ResponseClientResultModel<any>>, config: EffectActionsConfig): Action {
    const { successAction, failAction } = config;
    const { success, data, error } = result;
    if (success) {
      return successAction({ data });
    }
    return failAction({ data: error });
  }

}
