import { createAction, props } from '@ngrx/store';
import { ErrorActionData } from '@shared/types';

export const LOAD_PROVIDERS = createAction('[Providers] Load Providers');
export const PROVIDERS_LOADED_SUCCESS = createAction(
  '[Providers] Providers Loaded Success',
  props<{ payload: any[] }>()
);

export const PROVIDERS_LOADED_FAIL = createAction(
  '[Providers] Providers Loaded Fail',
  props<{ payload: ErrorActionData }>()
);
