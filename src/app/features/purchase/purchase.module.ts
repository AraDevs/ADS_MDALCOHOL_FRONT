import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BaseComponent } from './components/base/base.component';
import { PurchaseRoutingModule } from './purchase-routing.module';



@NgModule({
  declarations: [BaseComponent],
  imports: [
    SharedModule,
    PurchaseRoutingModule
  ]
})
export class PurchaseModule { }
