import { NgModule } from '@angular/core';
import * as state from '@features/providers/state';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { LoadI18nFile } from '@shared/helpers';
import { SharedModule } from '@shared/shared.module';

import { BaseComponent } from './components/base/base.component';
import { ProvidersRoutingModule } from './providers-routing.module';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent],
  imports: [
    SharedModule,
    ProvidersRoutingModule,
    EffectsModule.forFeature([state.ProvidersEffects])
  ],

  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'providers', alias: 'Providers', loader }
    }
  ]
})
export class ProvidersModule { }
