import { createAction, props } from '@ngrx/store';
import { ErrorActionData } from '@shared/types';

// Actions name
export const LoadProvidersAction = '[Providers] Load Providers';
export const ProvidersLoadedSuccessAction = '[Providers] Providers Loaded Success';
export const ProvidersLoadedFailAction = '[Providers] Providers Loaded Fail';

export const LoadProviders = createAction(LoadProvidersAction);
export const ProvidersLoadedSuccess = createAction(
  ProvidersLoadedSuccessAction,
  props<{ payload: any[]; }>()
);

export const ProvidersLoadedFail = createAction(
  ProvidersLoadedFailAction,
  props<{ payload: ErrorActionData; }>()
);
