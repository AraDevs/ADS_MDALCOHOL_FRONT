import {Observable} from 'rxjs';

export class RequestConfig<T> {
  data: T;
}

class ResponseClientResultModel<T> {
  success: boolean;
  data?: T;
  errors?: string[];
  error?: string;
  status: number;
}

export class ResponseClientModel<T> {
  result: Observable<Partial<ResponseClientResultModel<T>>>;
}

export abstract class RequestClient {
  abstract get<T>(requestConfig: RequestConfig<any>): ResponseClientModel<T>;
}


