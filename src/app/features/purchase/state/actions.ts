import { createAction, props } from '@ngrx/store';
import { PayloadAction, ErrorActionData, ActionMetadata } from '@shared/types';

export const SAVE_PURCHASES = createAction(
  '[Purchases] Save Purchases',
  props<{ payload: PayloadAction }>()
);
export const SAVE_PURCHASES_SUCCESS = createAction('[Purchases] Save Purchases Success');
export const SAVE_PURCHASES_FAIL = createAction(
  '[Purchases] Save Purchases Fail',
  props<{ payload: ErrorActionData }>()
);

export const UPDATE_PURCHASES = createAction(
  '[Purchases] Update Purchases',
  props<{ payload: PayloadAction }>()
);
export const UPDATE_PURCHASES_SUCCESS = createAction('[Purchases] Update Purchases Success');
export const UPDATE_PURCHASES_FAIL = createAction(
  '[Purchases] Update Purchases Fail',
  props<{ payload: ErrorActionData }>()
);

export const LOAD_PURCHASE_DETAIL = createAction(
  'Load Purchase Detail',
  props<{ payload: ActionMetadata }>()
);
export const PURCHASE_DETAIL_LOADED_SUCCESS = createAction(
  'Purchase Detail Loaded Success',
  props<{ payload: any }>()
);
export const PURCHASE_DETAIL_LOADED_FAIL = createAction(
  'Purchase Detail Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

export const CLEAR_PURCHASE_DETAIL = createAction('[BPurchase] Clear Purchase Detail');
