import { NgModule } from '@angular/core';

import { ClientsRoutingModule } from './clients-routing.module';
import { BaseComponent } from './components/base/base.component';
import { SharedModule } from '@shared/shared.module';
import { LoadI18nFile } from '@shared/helpers';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { StoreModule } from '@ngrx/store';
import * as state from '@features/clients/state';
import { EffectsModule } from '@ngrx/effects';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent],
  imports: [
    SharedModule,
    ClientsRoutingModule,
    StoreModule.forFeature(state.FEATURE_KEY, state.reducer),
    EffectsModule.forFeature([state.ClientsEffects])],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'clients', alias: 'Clients', loader }
    }
  ]
})
export class ClientsModule { }