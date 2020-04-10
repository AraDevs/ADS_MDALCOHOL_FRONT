import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BillRoutingModule } from './bill-routing.module';
import { BaseComponent } from './components/base/base.component';
import { FormComponent } from './components/form/form.component';
import { LoadI18nFile } from '@shared/helpers';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import * as state from '@features/bill/state';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent, FormComponent],
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
