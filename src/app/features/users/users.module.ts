import {NgModule} from '@angular/core';
import {LoadI18nFile} from '@shared/helpers';
import {UsersRoutingModule} from './users-routing.module';
import {BaseComponent} from './components/base/base.component';
import {SharedModule} from '@shared/shared.module';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UsersEffects, FEATURE_KEY, reducer} from '@features/users/state';
import { FormComponent } from './components/form/form.component';

const loader = LoadI18nFile((lang: string) => () => import(`./i18n/${lang}.json`));

@NgModule({
  declarations: [BaseComponent, FormComponent],
  imports: [
    SharedModule, UsersRoutingModule,
    StoreModule.forFeature(FEATURE_KEY, reducer),
    EffectsModule.forFeature([UsersEffects])],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {scope: 'users', alias: 'Users', loader}
    }
  ]
})
export class UsersModule {
}
