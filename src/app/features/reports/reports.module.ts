import { NgModule } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { LoadI18nFile } from '@shared/helpers';
import { SharedModule } from '@shared/shared.module';
import { BaseComponent } from './components/base/base.component';
import { ReportsRoutingModule } from './reports-routing.module';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent],
  imports: [SharedModule, ReportsRoutingModule],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'reports', alias: 'Reports', loader },
    },
  ],
})
export class ReportsModule {}
