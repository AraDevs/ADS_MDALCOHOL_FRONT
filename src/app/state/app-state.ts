import { State } from '@state/reducer';
import { UsersState } from '@features/users/state/reducer';
import { ProvidersState } from '@features/providers/state';
import { SellersState } from '@features/sellers/state';
import { ClientsState } from '@features/clients/state/reducer';

export interface AppState {
  app: State;
  users?: UsersState;
  providers?: ProvidersState;
  sellers?: SellersState;
  clients?: ClientsState;
}
