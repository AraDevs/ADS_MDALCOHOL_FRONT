import { createAction, props } from '@ngrx/store';
import { PayloadAction, ErrorActionData } from '@shared/types';

export const SAVE_PRODUCTION_ORDERS = createAction(
    '[Production Orders] Save Production Orders',
    props<{ payload: PayloadAction }>()
);
export const SAVE_PRODUCTION_ORDERS_SUCCESS = createAction('[Production Orders] Save Production Orders Sucess');
export const SAVE_PRODUCTION_FAIL = createAction(
    '[Production Orders] Save Production Orders Fail',
    props<{ payload: ErrorActionData }>()
);

export const UPDATE_PRODUCTION_ORDERS = createAction(
    '[Production Orders] Update Production Orders',
    props<{ payload: PayloadAction }>()
);
export const UPDATE_PRODUCTION_SUCCESS = createAction('[Production Orders] Update Production Orders Sucess');
export const UPDATE_PRODUCTION_FAIL = createAction(
    '[Production Orders] Update Production Orders Fail',
    props<{ payload: ErrorActionData }>()
);