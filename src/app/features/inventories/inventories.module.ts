import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoriesRoutingModule } from './inventories-routing.module';
import { BaseComponent } from './components/base/base.component';
import { FormComponent } from './components/form/form.component';


@NgModule({
  declarations: [BaseComponent, FormComponent],
  imports: [
    CommonModule,
    InventoriesRoutingModule
  ]
})
export class InventoriesModule { }
