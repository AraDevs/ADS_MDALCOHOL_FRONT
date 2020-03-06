import {createAction, props} from '@ngrx/store';

export const LoadUsers = createAction('[Users] Load Users');
export const UsersLoadedSuccess = createAction('[Users] Users Loaded Success',
  props<{ data: any[] }>());

