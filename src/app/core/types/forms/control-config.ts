import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export type FieldType = 'Input' | 'Select' | 'Checkbox' | 'Radio' | 'Datepicker' | 'Textarea';

export interface ControlConfig {
  key: string;
  fieldType: FieldType;
  name?: string;
  label?: string | Observable<string>;
  placeholder?: string;
  id?: string;
  defautlValue?: any;
  validations?: ValidatorFn | ValidatorFn[];
  validatorMessages?: string[];
  validationNames?: string[];
  globalValidatorMessage?: Observable<string>;
  cssClasses?: string;
  hidden$?: Observable<boolean>;
}
