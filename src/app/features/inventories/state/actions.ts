import { createAction, props } from '@ngrx/store';
import { PayloadAction, ErrorActionData } from '@shared/types';

export const SAVE_INVENTORIES = createAction(
    '[Inventories] Save Inventories',
    props<{ payload: PayloadAction }>()
);
export const SAVE_INVENTORIES_SUCCESS = createAction('[Inventories] Save Inventories Success');
export const SAVE_INVENTORIES_FAIL = createAction(
    '[Inventories] Save Inventories Fail',
    props<{ payload: ErrorActionData }>()
);

export const UPDATE_INVENTORIES = createAction(
    '[Inventories] Update Inventories',
    props<{ payload: PayloadAction }>()
);
export const UPDATE_INVENTORIES_SUCCESS = createAction('[Inventories] Update Inventories Success');
export const UPDATE_INVENTORIES_FAIL = createAction(
    '[Inventories] Update Inventories Fail',
    props<{ payload: ErrorActionData }>()
);