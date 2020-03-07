import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export interface FieldConfig {
  key: string;
  fieldType: 'Input' | 'Select';
  label?: string;
  placeholder?: string;
  id?: string;
  defautlValue?: string;
  validations?: ValidatorFn | ValidatorFn[];
  validatorMessages?: string[];
  validationNames?: string[];
  globalValidatorMessage?: Observable<string>;
}
