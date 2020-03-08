import { createAction, props } from '@ngrx/store';
import { ErrorActionData, PayloadAction } from '@shared/types';

export const LOAD_SELLERS = createAction('[Sellers] Load Sellers');
export const SELLERS_LOADED_SUCCESS = createAction(
  '[Sellers] Sellers Loaded Succes',
  props<{ payload: any[] }>()
);
export const SELLERS_LOADED_FAIL = createAction(
  '[Sellers] Sellers Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

/**
 * Las acciones que manden data al servidor deben ser de tipo PayloadAction
 */

export const SAVE_SELLERS = createAction(
  '[Sellers] Save Sellers',
  props<{ payload: PayloadAction }>()
);
export const SAVE_SELLERS_SUCCESS = createAction(
  '[Sellers] Save Sellers Succes',
  props<{ payload: any }>()
);
export const SAVE_SELLERS_FAIL = createAction(
  '[Sellers] Save Sellers Fail',
  props<{ payload: ErrorActionData }>()
);
