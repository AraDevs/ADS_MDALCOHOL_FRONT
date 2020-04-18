import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BillRoutingModule } from './bill-routing.module';
import { BaseComponent } from './components/base/base.component';
import { FormComponent } from './components/form/form.component';
import { LoadI18nFile } from '@shared/helpers';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import * as state from '@features/bill/state';
import { BillTableComponent } from './components/bill-table/bill-table.component';

import { FEATURE_KEY, reducer } from '@features/bill/state';
import { StoreModule } from '@ngrx/store';
import { BillDetailComponent } from './components/bill-detail/bill-detail.component';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent, FormComponent, BillTableComponent, BillDetailComponent],
  imports: [
    SharedModule,
    BillRoutingModule,
    StoreModule.forFeature(FEATURE_KEY, reducer),
    EffectsModule.forFeature([state.BillsEffects]),
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'bill', alias: 'Bill', loader },
    },
  ],
})
export class BillModule {}
