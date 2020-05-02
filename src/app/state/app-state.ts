import { SharedState } from '@dashboard-state/reducer';
import { UsersState } from '@features/users/state/reducer';
import { ClientState } from '@features/clients/state/reducer';
import { BillState } from '@features/bill/state';
import { PurchaseState } from '@features/purchase/state';

export interface AppState {
  sharedState: SharedState;
  users?: UsersState;
  clients?: ClientState;
  bill?: BillState;
  purchases?: PurchaseState;
}
