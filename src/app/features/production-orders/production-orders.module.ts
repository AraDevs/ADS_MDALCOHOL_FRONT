import { NgModule } from '@angular/core';
import { ProductionOrdersRoutingModule } from './production-orders-routing.module';
import { BaseComponent } from './components/base/base.component';
import { FormComponent } from './components/form/form.component';
import { SharedModule } from '@shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import * as state from '@features/production-orders/state';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { LoadI18nFile } from '@shared/helpers';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent, FormComponent],
  imports: [
    SharedModule,
    ProductionOrdersRoutingModule,
    EffectsModule.forFeature([state.ProductionOrdersEffects])
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'production_orders', alias: 'ProductionOrders', loader}
    }
  ]
})
export class ProductionOrdersModule { }
