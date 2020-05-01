import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BaseComponent } from './components/base/base.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [BaseComponent],
  imports: [SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
