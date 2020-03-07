import { createReducer, Action, on } from '@ngrx/store';
import * as actions from './actions';

export const FEATURE_KEY = 'providers';

export interface ProvidersState {
  providers: any[];
}

const INITIAL_STATE: ProvidersState = {
  providers: []
};

const providersReducer = createReducer(
  INITIAL_STATE,
  on(actions.ProvidersLoadedSuccess, (state, { payload }) => ({ ...state, providers: payload })),
);

export function reducer(state: ProvidersState | undefined, action: Action) {
  return providersReducer(state, action);
}
