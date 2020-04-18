import { createAction, props } from '@ngrx/store';
import { PayloadAction, ErrorActionData, ActionMetadata } from '@shared/types';

export const SAVE_BILLS = createAction('[Bills] Save Bills', props<{ payload: PayloadAction }>());
export const SAVE_BILLS_SUCCESS = createAction('[Bills] Save Bills Sucess');
export const SAVE_BILLS_FAIL = createAction(
  '[Bills] Save Bills Fail',
  props<{ payload: ErrorActionData }>()
);

export const UPDATE_BILLS = createAction(
  '[Bills] Update Bills',
  props<{ payload: PayloadAction }>()
);
export const UPDATE_BILLS_SUCCESS = createAction('[Bills] Update Bills Success');
export const UPDATE_BILLS_FAIL = createAction(
  '[Bills] Update Bills Fail',
  props<{ payload: ErrorActionData }>()
);

export const LOAD_BILL_DETAIL = createAction(
  'Load Bill Detail',
  props<{ payload: ActionMetadata }>()
);
export const BILL_DETAIL_LOADED_SUCCESS = createAction(
  'Bill Detail Loaded Success',
  props<{ payload: any }>()
);
export const BILL_DETAIL_LOADED_FAIL = createAction(
  'Bill Detail Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

export const CLEAR_BILL_DETAIL = createAction('[Bills] Clear Bill Detail');
