import { createAction, props } from '@ngrx/store';
import { ErrorActionData, ActionMetadata } from '@shared/types';

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
