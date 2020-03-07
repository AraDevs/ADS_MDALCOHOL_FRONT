import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { FieldConfig } from '@core/types';

@Injectable({ providedIn: 'root' })
export class ControlValidationService {
  valid(control: AbstractControl, field: FieldConfig) {
    const names = field.validationNames;
    const messages = field.validatorMessages;

    if (!Array.isArray(names) && !Array.isArray(messages)) {
      return null;
    }

    if (!control.valid) {
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        if (control.hasError(name)) {
          return messages[i];
        }
      }
    }
    return null;
  }
}
