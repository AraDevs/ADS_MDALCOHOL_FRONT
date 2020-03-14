import { createAction, props } from '@ngrx/store';
import { PayloadAction, ErrorActionData } from '@shared/types';

export const SAVE_PROVIDERS = createAction(
    '[Providers] Save Providers',
    props<{ payload: PayloadAction }>()
);
export const SAVE_PROVIDERS_SUCCESS = createAction('[Providers] Save Providers Success');
export const SAVE_PROVIDERS_FAIL = createAction(
    '[Providers] Save Providers Fail',
    props<{ payload: ErrorActionData }>()
);