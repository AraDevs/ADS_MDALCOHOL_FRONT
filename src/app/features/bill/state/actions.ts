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

export const LOAD_INVENTORY_BY_CLIENT = createAction(
  'Load Inventory By Client',
  props<{ payload: ActionMetadata }>()
);
export const INVENTORY_BY_CLIENT_LOADED_SUCCESS = createAction(
  'Inventory By Client Loaded Success',
  props<{ payload: any[] }>()
);
export const INVENTORY_BY_CLIENT_LOADED_FAIL = createAction(
  'Inventory By Client Loaded Fail',
  props<{ payload: ErrorActionData }>()
);
