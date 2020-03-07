import { State } from '@state/reducer';
import { UsersState } from '@features/users/state/reducer';
import { ProvidersState } from '@features/providers/state';

export interface AppState {
  app: State;
  users?: UsersState;
  providers?: ProvidersState;
}
