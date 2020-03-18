import { NgModule } from '@angular/core';
import * as state from '@features/clients/state';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { LoadI18nFile } from '@shared/helpers';
import { SharedModule } from '@shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { BaseComponent } from './components/base/base.component';
import { FormComponent } from './components/form/form.component';
import { SpecialPriceComponent } from './components/special-price/special-price.component';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent, FormComponent, SpecialPriceComponent],
  imports: [SharedModule, ClientsRoutingModule, EffectsModule.forFeature([state.ClientsEffects])],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'clients', alias: 'Clients', loader }
    }
  ]
})
export class ClientsModule {}
