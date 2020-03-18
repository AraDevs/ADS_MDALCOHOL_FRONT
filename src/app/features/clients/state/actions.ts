import { createAction, props } from '@ngrx/store';
import { PayloadAction, ErrorActionData } from '@shared/types';

export const SAVE_CLIENTS = createAction(
  '[Clients] Save Clients',
  props<{ payload: PayloadAction }>()
);
export const SAVE_CLIENTS_SUCCESS = createAction('[Clients] Save Clients Success');
export const SAVE_CLIENTS_FAIL = createAction(
  '[Clients] Save Clients Fail',
  props<{ payload: ErrorActionData }>()
);

export const UPDATE_CLIENTS = createAction(
  '[Clients] Update Clients',
  props<{ payload: PayloadAction }>()
);
export const UPDATE_CLIENTS_SUCCESS = createAction('[Clients] Update Clients Success');
export const UPDATE_CLIENTS_FAIL = createAction(
  '[Clients] Update Clients Fail',
  props<{ payload: ErrorActionData }>()
);

// SPECIAL PRICE

export const LOAD_SPECIAL_PRICE = createAction('Load Special Prices');
export const SPECIAL_PRICE_LOADED_SUCCESS = createAction(
  'Special Prices Loaded Success',
  props<{ payload: any[] }>()
);
export const SPECIAL_PRICE_LOADED_FAIL = createAction(
  'Special Prices Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

export const SAVE_SPECIAL_PRICE = createAction(
  '[Clients] Save Special Price',
  props<{ payload: PayloadAction }>()
);
export const SAVE_SPECIAL_PRICE_SUCCESS = createAction('[Clients] Save Special Price Success');
export const SAVE_SPECIAL_PRICE_FAIL = createAction(
  '[Clients] Save Special Price Fail',
  props<{ payload: ErrorActionData }>()
);
