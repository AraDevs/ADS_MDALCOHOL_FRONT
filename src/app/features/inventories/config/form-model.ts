import { Store, select } from '@ngrx/store';
import { Validators } from '@angular/forms';
import * as globalState from '@state/index';
import { map } from 'rxjs/operators';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormModel {
  hideProviders$ = new BehaviorSubject<boolean>(true);
  hideProducType$ = new BehaviorSubject<boolean>(false);

  constructor(private store$: Store<any>) {}

  getModel(): Partial<InputControlConfig | SelectControlConfig>[] {
    return [
      {
        key: 'name',
        fieldType: 'Input',
        type: 'text',
        id: 'name',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Inventories.Form.Name'
      },
      {
        key: 'description',
        fieldType: 'Input',
        type: 'text',
        id: 'description',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Inventories.Form.Description'
      },
      {
        key: 'price',
        fieldType: 'Input',
        type: 'text',
        id: 'price',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Inventories.Form.Price'
      },
      {
        key: 'stock',
        fieldType: 'Input',
        type: 'text',
        id: 'stock',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Inventories.Form.Stock'
      },
      {
        key: 'type',
        fieldType: 'Select',
        id: 'type',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        label: 'Inventories.Form.Type',
        options$: this.store$.pipe(
          select(globalState.selectTypeProduct),
          map((typesProduct: string[]) => {
            return typesProduct.map(product => ({ label: product, value: product }));
          })
        ),
        hidden$: this.hideProducType$.asObservable()
      },
      {
        key: 'provider',
        fieldType: 'Select',
        id: 'provider',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        label: 'Inventories.Form.Provider',
        options$: this.store$.pipe(
          select(globalState.selectProviders),
          map((providers: any[]) => {
            return providers.map(provider => ({
              label: provider.partner.name,
              value: provider.id
            }));
          })
        ),
        hidden$: this.hideProviders$.asObservable()
      },
      {
        key: 'state',
        fieldType: 'Checkbox',
        id: 'state',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Inventories.Form.State',
        defautlValue: true
      }
    ];
  }
}
