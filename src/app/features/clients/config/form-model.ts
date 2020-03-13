import { InputControlConfig } from "@core/types";
import { Injectable } from "@angular/core";
import { SelectControlConfig } from '@core/types/forms/select-control-config';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as globalState from '@state/index';
import { Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable()
export class FormModel {

  constructor(private store$: Store<any>) {}

  getModel(): Partial<InputControlConfig | SelectControlConfig>[] {
    return [
      {
        // client
        key: 'businessName',
        fieldType: 'Input',
        type: 'text',
        id: 'businessName',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Clients.Form.BusinessName'
      },
      {
        key: 'dui',
        fieldType: 'Input',
        type: 'text',
        id: 'dui',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        label: 'Clients.Form.Dui'
      },
      {
        key: 'registry',
        fieldType: 'Input',
        type: 'text',
        id: 'registry',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Clients.Form.Registry'
      },
      {
        key: 'personType',
        fieldType: 'Select',
        id: 'personType',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        label: 'Clients.Form.PersonType',
        options$: this.store$.pipe(select(globalState.selectTypePerson),
          map((typesPerson: string[]) => {
            return typesPerson.map(person => ({ label: person, value: person }));
          }))
      },
      {
        key: 'seller',
        fieldType: 'Select',
        id: 'seller',
        cssClasses: '',
        label: 'Clients.Form.SellerId',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        options$: this.store$.pipe(
          select(globalState.selectSellers),
          map((sellers: any[]) => {
            return sellers.map(obj => ({ ...obj, label: obj.name}));
        }))
      },
      // seller
      {
        key: 'sellerName',
        fieldType: 'Input',
        type: 'text',
        id: 'sellerName',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Clients.Form.Name'
      },
      {
        key: 'address',
        fieldType: 'Input',
        type: 'text',
        id: 'address',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Clients.Form.Address'
      },
      {
        key: 'departmentId',
        fieldType: 'Select',
        id: 'departmentId',
        cssClasses: '',
        label: 'Clients.Form.DepartmentId',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        options$: this.store$.pipe(select(globalState.selectDepartments))
      },
      {
        key: 'municipality',
        fieldType: 'Select',
        id: 'municipality',
        cssClasses: '',
        label: 'Clients.Form.MunicipalityId',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        options$: this.store$.pipe(select(globalState.selectMunicipalities))
      },
      {
        key: 'nit',
        fieldType: 'Input',
        type: 'text',
        id: 'nit',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Clients.Form.Nit'
      },
      {
        key: 'phone',
        fieldType: 'Input',
        type: 'text',
        id: 'phone',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Clients.Form.Phone'
      },
      {
        key: 'state',
        fieldType: 'Checkbox',
        id: 'state',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Clients.Form.State',
        defautlValue: true
      }
    ];
  }
}
