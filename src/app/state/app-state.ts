import { State } from '@state/reducer';
import { UsersState } from '@features/users/state/reducer';
import { ClientState } from '@features/clients/state/reducer';
import { BillState } from '@features/bill/state';

export interface AppState {
  data: State;
  users?: UsersState;
  clients?: ClientState;
  bill?: BillState;
}
