import * as objectPath from 'object-path';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ObjectPathService {
  get(obj: any, key: string) {
    return objectPath.get(obj, key);
  }
}
