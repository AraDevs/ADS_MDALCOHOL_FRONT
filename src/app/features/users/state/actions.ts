import { createAction, props } from '@ngrx/store';
import { ErrorActionData } from '@shared/types';

export const LoadUsersAction = '[Users] Load Users';
export const UsersLoadedSuccessAction = '[Users] Users Loaded Success';
export const LoadUsersFailAction = '[Users] Load UsersFail';

export const LoadUserAction = '[Users] Load User';
export const UserLoadedSuccessAction = '[Users] User Loaded Success';
export const LoadUserFaildAction = '[Users] Load User Faild';


export const LoadUsers = createAction(LoadUsersAction);
export const UsersLoadedSuccess = createAction(UsersLoadedSuccessAction,
  props<{ data: any[]; }>());
export const LoadUsersFail = createAction(LoadUsersFailAction,
  props<{ data: ErrorActionData; }>());


export const LoadUser = createAction(LoadUserAction,
  props<{ data: { id: number; }; }>());
export const UserLoadedSuccess = createAction(UserLoadedSuccessAction,
  props<{ data: any[]; }>());
export const LoadUserFaild = createAction(LoadUserFaildAction,
  props<{ data: ErrorActionData; }>());
