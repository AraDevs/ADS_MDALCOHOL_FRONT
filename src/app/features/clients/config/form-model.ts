import { InputControlConfig } from "@core/types";
import { Injectable } from "@angular/core";
import { SelectControlConfig } from '@core/types/forms/select-control-config';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as globalState from '@state/index';
import { Validators } from '@angular/forms';

@Injectable()
export class FormModel {

  constructor(private store$: Store<any>) {}

  getModel(): Partial<InputControlConfig | SelectControlConfig>[] {
    return [
      {
        // client
        key: 'business_name',
        fieldType: 'Input',
        type: 'text',
        id: 'business_name',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['Clients.FormValidator.Client.Required'],
        validationNames: ['required'],
        label: 'Clients.Form.BusinessName'
      },
      {
        key: 'dui',
        fieldType: 'Input',
        type: 'text',
        id: 'dui',
        cssClasses: '',
        label: 'Clients.Form.Dui'
      },
      {
        key: 'registry_no',
        fieldType: 'Input',
        type: 'text',
        id: 'registry_no',
        cssClasses: '',
        label: 'Clients.Form.Registry'
      },
      {
        key: 'person_type',
        fieldType: 'Select',
        id: 'person_type',
        cssClasses: '',
        label: 'Clients.Form.PersonType'
      },
      {
        key: 'seller_id',
        fieldType: 'Select',
        id: 'seller_id',
        cssClasses: '',
        label: 'Clients.Form.SellerId'
      },
      // seller
      {
        key: 'name',
        fieldType: 'Input',
        type: 'text',
        id: 'name',
        cssClasses: '',
        label: 'Clients.Form.Name'
      },
      {
        key: 'address',
        fieldType: 'Input',
        type: 'text',
        id: 'address',
        cssClasses: '',
        label: 'Clients.Form.Address'
      },
      {
        key: 'department_id',
        fieldType: 'Select',
        id: 'department_id',
        cssClasses: '',
        label: 'Clients.Form.DepartmentId',
        options$: this.store$.pipe(select(globalState.selectDepartments))
      },
      {
        key: 'municipality_id',
        fieldType: 'Select',
        id: 'municipality_id',
        cssClasses: '',
        label: 'Clients.Form.MunicipalityId',
        options$: this.store$.pipe(select(globalState.selectMunicipalities))
      },
      {
        key: 'nit',
        fieldType: 'Input',
        type: 'text',
        id: 'nit',
        cssClasses: '',
        label: 'Clients.Form.Nit'
      },
      {
        key: 'phone',
        fieldType: 'Input',
        type: 'text',
        id: 'phone',
        cssClasses: '',
        label: 'Clients.Form.Phone'
      },
      {
        key: 'state',
        fieldType: 'Checkbox',
        id: 'state',
        cssClasses: '',
        label: 'Clients.Form.State',
        defautlValue: true
      }
    ];
  }
}
