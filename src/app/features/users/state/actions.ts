import { createAction, props } from '@ngrx/store';

export const LoadUsers = createAction('[Users] Load Users');
export const UsersLoadedSuccess = createAction('[Users] Users Loaded Success',
  props<{ data: any[]; }>());

export const LoadUser = createAction('[Users] Load User',
  props<{ data: { id: number; }; }>());
export const UserLoadedSuccess = createAction('[Users] User Loaded Success',
  props<{ data: any[]; }>());

