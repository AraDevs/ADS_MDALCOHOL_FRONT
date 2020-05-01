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
  abstract post<T>(requestData: RequestData): ResponseClientModel<T>;
  abstract put<T>(requestData: RequestData): ResponseClientModel<T>;
}
