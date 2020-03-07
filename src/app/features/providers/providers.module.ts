import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BaseComponent } from './components/base/base.component';
import { ProvidersRoutingModule } from './providers-routing.module';
import { LoadI18nFile } from '@shared/helpers';
import * as state from '@features/providers/state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent],
  imports: [
    SharedModule,
    ProvidersRoutingModule,
    StoreModule.forFeature(state.FEATURE_KEY, state.reducer),
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
