import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsModule } from './features/clients/clients.module';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'providers',
    loadChildren: () => import('./features/providers/providers.module').then(m => m.ProvidersModule)
  },
  {
    path: 'sellers',
    loadChildren: () => import('./features/sellers/sellers.module').then(m => m.SellersModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./features/clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./features/test-modal/test-modal.module').then(m => m.TestModalModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
