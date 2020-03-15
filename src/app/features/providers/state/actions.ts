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

export const UPDATE_PROVIDERS = createAction(
  '[Providers] Update Providers',
  props<{ payload: PayloadAction }>()
);
export const UPDATE_PROVIDERS_SUCCESS = createAction('[Providers] Update Providers Success');
export const UPDATE_PROVIDERS_FAIL = createAction(
  '[Providers] Update Providers Fail',
  props<{ payload: ErrorActionData }>()
);
