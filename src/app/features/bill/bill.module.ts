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
import { TotalListComponent } from './components/bill-table/components/total-list/total-list.component';
import { TotalTitlesListComponent } from './components/bill-table/components/total-titles-list/total-titles-list.component';
import { TableSelectComponent } from './components/bill-table/components/table-select/table-select.component';
import { TableInputComponent } from './components/bill-table/components/table-input/table-input.component';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent, FormComponent, BillTableComponent, TotalListComponent, TotalTitlesListComponent, TableSelectComponent, TableInputComponent],
  imports: [
    SharedModule,
    BillRoutingModule,
    EffectsModule.forFeature([state.BillsEffects])
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'bill', alias: 'Bill', loader },
    },
  ],
})
export class BillModule {}
