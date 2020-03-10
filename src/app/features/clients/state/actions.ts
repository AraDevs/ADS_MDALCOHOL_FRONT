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