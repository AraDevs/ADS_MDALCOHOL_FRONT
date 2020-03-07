import { Injectable } from '@angular/core';
import { FieldConfig } from '@core/types';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  createPlainForm(fields: FieldConfig[]) {
    const model = fields.reduce((prev, value) => {
      const defaultValue = value.defautlValue ? value.defautlValue : '';
      const validations = value.validations ? value.validations : [];
      return { ...prev, [value.key]: new FormControl(defaultValue, validations) };
    }, {});
    return new FormGroup(model);
  }
}
