import { Observable } from 'rxjs';
import { RequestData } from './request-data';

export class ResponseClientResultModel<T> {
  success: boolean;
  data?: T;
  error?: any;
  status: number;
  message: string;
}

export class ResponseClientModel<T> {
  result: Observable<Partial<ResponseClientResultModel<T>>>;
}

export abstract class RequestClient {
  abstract get<T>(requestData: RequestData): ResponseClientModel<T>;
  abstract save<T>(requestData: RequestData): ResponseClientModel<T>;
  abstract update<T>(requestData: RequestData): ResponseClientModel<T>;
}
