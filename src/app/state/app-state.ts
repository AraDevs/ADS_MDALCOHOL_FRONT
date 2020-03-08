import { State } from '@state/reducer';
import { UsersState } from '@features/users/state/reducer';


export interface AppState {
  data: State;
  users?: UsersState;
}
