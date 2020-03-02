import { NgModule } from '@angular/core';
import { LoadI18nFile } from '@shared/helpers';
import { UsersRoutingModule } from './users-routing.module';
import { BaseComponent } from './components/base/base.component';
import { SharedModule } from '@shared/shared.module';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent],
  imports: [SharedModule, UsersRoutingModule],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'users', alias: 'Users', loader }
    }
  ]
})
export class UsersModule {}
