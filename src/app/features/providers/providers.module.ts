import { NgModule } from '@angular/core';
import * as state from '@features/providers/state';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { LoadI18nFile } from '@shared/helpers';
import { SharedModule } from '@shared/shared.module';

import { BaseComponent } from './components/base/base.component';
import { ProvidersRoutingModule } from './providers-routing.module';
import { FormComponent } from './components/form/form.component';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent, FormComponent],
  imports: [
    SharedModule,
    ProvidersRoutingModule,
    EffectsModule.forFeature([state.ProvidersEffects])
  ],
  entryComponents: [FormComponent],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'providers', alias: 'Providers', loader }
    }
  ]
})
export class ProvidersModule {}
