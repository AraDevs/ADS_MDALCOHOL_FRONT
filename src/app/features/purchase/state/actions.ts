import { createAction, props } from '@ngrx/store';
import { PayloadAction, ErrorActionData } from '@shared/types';

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