import { Injectable } from '@angular/core';
import { RequestData, ResponseClientResultModel } from '@core/client';
import { EffectActionsConfig, EffectConfigModel } from '@core/types';
import { Actions, ofType } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PayloadAction } from '@shared/types';

type Action = { data: any } & TypedAction<string>;

@Injectable({ providedIn: 'root' })
export class EffectsFactoryService {
  constructor(private actions$: Actions) {}

  create(config: EffectConfigModel): Observable<Action> {
    const { requestConfig, resource, resourceFactory, actionsConfig, requestOptions } = config;
    const { method, requestClient } = requestConfig;
    const { actionToListen } = actionsConfig;

    return this.actions$.pipe(
      ofType(actionToListen),
      switchMap((action: { type: string; payload?: PayloadAction }) => {
        const hasPayload = !!action.payload;

        const requestData = new RequestData();
        requestData.resource = resource;

        if (hasPayload) {
          requestData.resource = !!resource
            ? resource
            : resourceFactory.create(action.payload.metadata);

          requestData.data = action.payload.data;
          requestData.options = !!requestOptions ? requestOptions : null;
        }

        const { result } = requestClient[method]<any>(requestData);
        return result.pipe(
          map((res: Partial<ResponseClientResultModel<any>>) =>
            this.getActionToDispatch()(res, actionsConfig)
          )
        ) as Observable<Action>;
      })
    );
  }

  // Returns success action or fail action that the effect will be dispatch to the store
  private getActionToDispatch() {
    return (result: Partial<ResponseClientResultModel<any>>, config: EffectActionsConfig) => {
      const { successAction, failAction } = config;
      const { success, data, error, message } = result;
      if (success) {
        return successAction({ payload: data });
      }

      return failAction({ payload: { error } });
    };
  }
}
