import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from '@state/global.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      { app: reducer },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true
        }
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ]
})
export class CoreModule {}
