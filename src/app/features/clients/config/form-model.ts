import { InputControlConfig } from "@core/types";
import { Injectable } from "@angular/core";
import { SelectControlConfig } from '@core/types/forms/select-control-config';
import { Observable, of } from 'rxjs';

@Injectable()
export class FormModel {
  getModel(): Partial<InputControlConfig | SelectControlConfig>[] {
    return [
      {
        key: 'business-name',
        fieldType: 'Input',
        type: 'text',
        id: 'business-name',
        cssClasses: '',
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
        key: 'registry-no',
        fieldType: 'Input',
        type: 'text',
        id: 'registry-no',
        cssClasses: '',
        label: 'Clients.Form.Registry'
      },
      {
        key: 'person-type',
        fieldType: 'Select',
        id: 'person-type',
        cssClasses: '',
        label: 'Clients.Form.PersonType'
      },
      {
        key: 'seller-id',
        fieldType: 'Select',
        id: 'seller-id',
        cssClasses: '',
        label: 'Clients.Form.SellerId'
      },
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
        key: 'municipality-id',
        fieldType: 'Select',
        id: 'municipality-id',
        cssClasses: '',
        label: 'Clients.Form.MunicipalityId',
        options$: of([
          {
            label: "Nombre"
          }
        ])
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
