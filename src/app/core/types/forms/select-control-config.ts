import { ControlConfig } from './control-config';
import { Observable } from 'rxjs';

export interface SelectControlConfig extends ControlConfig {
  options$: Observable<{ label: string; [key: string]: any }[]>;
}
