import { NgModule } from '@angular/core';
import * as state from '@features/clients/state';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { LoadI18nFile } from '@shared/helpers';
import { SharedModule } from '@shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { BaseComponent } from './components/base/base.component';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent],
  imports: [SharedModule, ClientsRoutingModule, EffectsModule.forFeature([state.ClientsEffects])],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'clients', alias: 'Clients', loader }
    }
  ]
})
export class ClientsModule {}
