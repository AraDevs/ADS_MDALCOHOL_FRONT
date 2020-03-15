import { createAction, props } from '@ngrx/store';
import { ErrorActionData, ActionMetadata, PayloadAction } from '@shared/types';

export const LOAD_USERS = createAction('[Users] Load Users');
export const USERS_LOADED_SUCCESS = createAction(
  '[Users] Users Loaded Success',
  props<{ payload: any[] }>()
);
export const USERS_LOADED_FAIL = createAction(
  '[Users] Load UsersFail',
  props<{ payload: ErrorActionData }>()
);

export const LOAD_USER = createAction('[Users] Load User', props<{ payload: ActionMetadata }>());
export const USER_LOADED_SUCCESS = createAction(
  '[Users] User Loaded Success',
  props<{ payload: any[] }>()
);
export const USER_LOADED_FAIL = createAction(
  '[Users] Load User Faild',
  props<{ payload: ErrorActionData }>()
);
export const SAVE_USERS = createAction(
  '[Users] Save Users',
  props<{ payload: PayloadAction }>()
);
export const SAVE_USERS_SUCCESS = createAction('[Users] Save Users Success');
export const SAVE_USERS_FAIL = createAction(
    '[Users] Save Users Fail',
    props<{ payload: ErrorActionData }>()
);
