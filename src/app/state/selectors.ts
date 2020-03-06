import { createSelector } from '@ngrx/store';
import { AppState } from './app-state';


export const selectError = createSelector(
  (state: AppState) => state.app.errors,
  (errors, props: { action: string; }) => errors.find(obj => obj.action === props.action)
);

