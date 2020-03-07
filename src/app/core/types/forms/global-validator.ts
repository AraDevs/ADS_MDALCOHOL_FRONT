import { Subject } from 'rxjs';
export interface GlobalValidator {
  [key: string]: Subject<string>;
}
