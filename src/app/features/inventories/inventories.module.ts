import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import * as state from '@features/inventories/state';
import { InventoriesRoutingModule } from './inventories-routing.module';
import { BaseComponent } from './components/base/base.component';
import { EffectsModule } from '@ngrx/effects';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { LoadI18nFile } from '@shared/helpers';
import { FormComponent } from './components/form/form.component';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent, FormComponent],
  imports: [
    SharedModule,
    InventoriesRoutingModule,
    EffectsModule.forFeature([state.InventoriesEffects])
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'inventories', alias: 'Inventories', loader }
    }
  ]
})
export class InventoriesModule { }
