import { NgModule } from '@angular/core';

import { TestModalRoutingModule } from './test-modal-routing.module';
import { BaseComponent } from './components/base/base.component';
import { HelloComponent } from './components/hello/hello.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [BaseComponent, HelloComponent],
  entryComponents: [HelloComponent],
  imports: [SharedModule, TestModalRoutingModule]
})
export class TestModalModule {}
