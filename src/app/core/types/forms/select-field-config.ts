import { FieldConfig } from './field-config';
import { Observable } from 'rxjs';

export interface SelectFieldConfig extends FieldConfig {
  options$: Observable<any[]>;
}
