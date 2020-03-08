import { InputControlConfig, SelectControlConfig } from '@core/types';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class FormModel {
  getModel(): Partial<InputControlConfig | SelectControlConfig>[] {
    return [
      {
        key: 'name',
        fieldType: 'Input',
        type: 'text',
        id: 'name',
        cssClasses: '',
        label: 'Providers.Form.Name'
      },
      {
        key: 'address',
        fieldType: 'Input',
        id: 'address',
        type: 'text',
        label: 'Providers.Form.Address',
        cssClasses: ''
      },
      {
        key: 'nit',
        fieldType: 'Input',
        id: 'nit',
        type: 'text',
        label: 'Providers.Form.Nit',
        cssClasses: ''
      },
      {
        key: 'partner-phone',
        fieldType: 'Input',
        id: 'partner-phone',
        type: 'text',
        label: 'Providers.Form.PartnerPhone',
        cssClasses: ''
      },
      {
        key: 'seller-phone',
        fieldType: 'Input',
        id: 'seller-phone',
        type: 'text',
        label: 'Providers.Form.SellerPhone',
        cssClasses: ''
      },
      {
        key: 'department',
        fieldType: 'Select',
        id: 'department',
        label: 'Providers.Form.Deparment',
        options$: of([{ label: 'Option' }]),
        cssClasses: ''
      },
      {
        key: 'municipality',
        fieldType: 'Select',
        id: 'municipality',
        label: 'Providers.Form.Deparment',
        options$: of([{ label: 'Option' }]),
        cssClasses: ''
      },
      {
        key: 'state',
        fieldType: 'Checkbox',
        id: 'state',
        label: 'Providers.Form.State',
        defautlValue: true,
        cssClasses: ''
      }
    ];
  }
}
