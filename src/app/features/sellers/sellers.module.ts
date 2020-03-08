import { NgModule } from '@angular/core';

import { SellersRoutingModule } from './sellers-routing.module';
import { BaseComponent } from './components/base/base.component';

import {SharedModule} from '@shared/shared.module';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { LoadI18nFile } from '@shared/helpers';
import { StoreModule } from '@ngrx/store';
import * as state from '@features/sellers/state';
import { EffectsModule } from '@ngrx/effects';
import {CommonModule} from '@angular/common'
const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature(state.FEATURE_KEY, state.reducer),
    EffectsModule.forFeature([state.SellersEffects]),
    SellersRoutingModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {scope: 'sellers', alias: 'Sellers', loader}
    }
  ]
})
export class SellersModule { }