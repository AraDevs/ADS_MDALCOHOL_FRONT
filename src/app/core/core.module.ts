import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestClient, RequestHttpClient } from '@core/client';
import { reducer } from '@dashboard-state/index';
import { environment } from '@environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from '@shared/material/material.module';
import { TranslocoRootModule } from '../transloco-root.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    TranslocoRootModule,
    MaterialModule,
    // Configure Ngrx Store
    StoreModule.forRoot(
      { sharedState: reducer },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
        },
      }
    ),
    // Configure Devtools for Ngrx in development
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    // Configure Effects
    EffectsModule.forRoot([]),
  ],
  providers: [
    {
      provide: RequestClient,
      useClass: RequestHttpClient,
    },
    AsyncPipe,
  ],
  exports: [TranslocoRootModule, MaterialModule],
})
export class CoreModule {}
