import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export interface ControlConfig {
  key: string;
  fieldType: 'Input' | 'Select' | 'Checkbox' | 'Radio' | 'Datepicker' | 'Textarea';
  name?: string;
  label?: string;
  placeholder?: string;
  id?: string;
  defautlValue?: any;
  validations?: ValidatorFn | ValidatorFn[];
  validatorMessages?: string[];
  validationNames?: string[];
  globalValidatorMessage?: Observable<string>;
  cssClasses: string;
  hidden$?: Observable<boolean>;
}

