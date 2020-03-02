import { createAction, props } from '@ngrx/store';

export const SetLoggedUser = createAction('[Login] Set Logged User', props<{ username: string }>());
