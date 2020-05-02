import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from '@state/index';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from '../transloco-root.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { RequestClient, RequestHttpClient } from '@core/client';
import { LoadDataEffects } from '@state/load-data-effects';

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
      { data: reducer },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true
        }
      }
    ),
    // Configure Devtools for Ngrx in development
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    // Configure Effects
    EffectsModule.forRoot([])
  ],
  providers: [
    {
      provide: RequestClient,
      useClass: RequestHttpClient
    }
  ],
  exports: [TranslocoRootModule, MaterialModule]
})
export class CoreModule {}
