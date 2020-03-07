import { FieldConfig } from './field-config';
import { Observable } from 'rxjs';

export interface RadioButtonConfig extends FieldConfig {
  options$: Observable<any[]>;
}
