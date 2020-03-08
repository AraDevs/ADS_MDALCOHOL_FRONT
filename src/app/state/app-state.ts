import { State } from '@state/reducer';
import { UsersState } from '@features/users/state/reducer';
import { ProvidersState } from '@features/providers/state';
<<<<<<< HEAD
import { SellersState } from '@features/sellers/state';
=======
import { ClientsState } from '@features/clients/state/reducer';
>>>>>>> origin/client

export interface AppState {
  app: State;
  users?: UsersState;
  providers?: ProvidersState;
<<<<<<< HEAD
  sellers?: SellersState;
=======
  clients?: ClientsState;
>>>>>>> origin/client
}
