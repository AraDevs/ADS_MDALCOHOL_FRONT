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