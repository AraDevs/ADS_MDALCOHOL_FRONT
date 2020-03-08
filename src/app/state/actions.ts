import { createAction, props } from '@ngrx/store';
import { ErrorActionData } from '@shared/types';

export const LOAD_SELLERS = createAction('Load Sellers');
export const SELLERS_LOADED_SUCCESS = createAction(
  'Sellers Loaded Succes',
  props<{ payload: any[] }>()
);
export const SELLERS_LOADED_FAIL = createAction(
  'Sellers Loaded Fail',
  props<{ payload: ErrorActionData }>()
);
