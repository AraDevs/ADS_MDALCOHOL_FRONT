import { createAction, props } from '@ngrx/store';
import { ErrorActionData, PayloadAction } from '@shared/types';

/**
 * Las acciones que manden data al servidor deben ser de tipo PayloadAction
 */

export const SAVE_SELLERS = createAction(
  '[Sellers] Save Sellers',
  props<{ payload: PayloadAction }>()
);
export const SAVE_SELLERS_SUCCESS = createAction('[Sellers] Save Sellers Succes');
export const SAVE_SELLERS_FAIL = createAction(
  '[Sellers] Save Sellers Fail',
  props<{ payload: ErrorActionData }>()
);

export const UPDATE_SELLERS = createAction(
  '[Sellers] Update Sellers',
  props<{ payload: PayloadAction }>()
);
export const UPDATE_SELLERS_SUCCESS = createAction('[Sellers] Update Sellers Success');
export const UPDATE_SELLERS_FAIL = createAction(
  '[Sellers] Update Sellers Fail',
  props<{ payload: ErrorActionData }>()
);
