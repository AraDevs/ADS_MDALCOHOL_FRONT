import { createAction, props } from '@ngrx/store';

export const GlobalError = createAction('[App] GlobalError', props<{ data: { error: string, action: string; }; }>());
export const RemoveGlobalError = createAction('[App] RemoveGlobalError', props<{ data: { action: string; }; }>());
export const AddActionInProcess = createAction('[App] AddActionInProcess', props<{ data: { action: string; key?: string; }; }>());
