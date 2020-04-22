import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BaseComponent } from './components/base/base.component';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseTableComponent } from './components/purchase-table/purchase-table.component';
import { LoadI18nFile } from '@shared/helpers';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FormComponent } from './components/form/form.component';
import { EffectsModule } from '@ngrx/effects';
import * as state from '@features/purchase/state';
import { StoreModule } from '@ngrx/store';
import { PurchaseDetailComponent } from './components/purchase-detail/purchase-detail.component';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent, PurchaseTableComponent, FormComponent, PurchaseDetailComponent],
  imports: [
    SharedModule,
    PurchaseRoutingModule,
    EffectsModule.forFeature([state.PurchasesEffects]),
    StoreModule.forFeature(state.FEATURE_KEY, state.reducer),
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'purchase', alias: 'Purchase', loader },
    },
  ],
})
export class PurchaseModule {}
