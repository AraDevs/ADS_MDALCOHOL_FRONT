import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { BaseComponent } from './components/base/base.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [LoginComponent, BaseComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
