import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RequestClient, RequestHttpClient } from '@core/client';
import { SharedModule } from '@shared/shared.module';
import { BaseComponent } from './components/base/base.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { HeaderInterceptor } from './interceptors/header-interceptor';
import { EffectsModule } from '@ngrx/effects';
import { LoadDataEffects } from '@dashboard-state/load-data-effects';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    HttpClientModule,
    EffectsModule.forFeature([LoadDataEffects]),
  ],
  providers: [
    {
      provide: RequestClient,
      useClass: RequestHttpClient,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
})
export class DashboardModule {}
