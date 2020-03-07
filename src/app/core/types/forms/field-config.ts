import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export interface FieldConfig {
  key: string;
  name?: string;
  fieldType: 'Input' | 'Select' | 'Checkbox' | 'Radio';
  label?: string;
  placeholder?: string;
  id?: string;
  defautlValue?: any;
  validations?: ValidatorFn | ValidatorFn[];
  validatorMessages?: string[];
  validationNames?: string[];
  globalValidatorMessage?: Observable<string>;
}
