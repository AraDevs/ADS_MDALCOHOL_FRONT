import { BaseComponent } from './components/base/base.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./../../features/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'providers',
        loadChildren: () =>
          import('./../../features/providers/providers.module').then((m) => m.ProvidersModule),
      },
      {
        path: 'sellers',
        loadChildren: () =>
          import('./../../features/sellers/sellers.module').then((m) => m.SellersModule),
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('./../../features/clients/clients.module').then((m) => m.ClientsModule),
      },
      {
        path: 'modal',
        loadChildren: () =>
          import('./../../features/test-modal/test-modal.module').then((m) => m.TestModalModule),
      },
      {
        path: 'inventories',
        loadChildren: () =>
          import('./../../features/inventories/inventories.module').then(
            (m) => m.InventoriesModule
          ),
      },
      {
        path: 'production-orders',
        loadChildren: () =>
          import('./../../features/production-orders/production-orders.module').then(
            (m) => m.ProductionOrdersModule
          ),
      },
      {
        path: 'bills',
        loadChildren: () => import('./../../features/bill/bill.module').then((m) => m.BillModule),
      },
      {
        path: 'purchases',
        loadChildren: () =>
          import('./../../features/purchase/purchase.module').then((m) => m.PurchaseModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
