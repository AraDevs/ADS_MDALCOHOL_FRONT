import { createAction, props } from '@ngrx/store';
import { ErrorActionData } from '@shared/types';

export const LOAD_SELLERS = createAction('[Clients] Load Sellers');
export const SELLERS_LOADED_SUCCESS = createAction(
  '[Clients] Sellers Loaded Success',
  props<{ payload: any[] }>()
);
export const SELLERS_LOADED_FAIL = createAction(
  '[Clients] Sellers Loaded Fail',
  props<{ payload: ErrorActionData }>()
);
