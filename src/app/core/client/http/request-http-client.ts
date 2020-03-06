import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestClient, ResponseClientModel } from '@core/client/request-client/request-client';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RequestData } from '../request-client/request-data';
import { HttpOptions } from './http-options';


@Injectable()
export class RequestHttpClient extends RequestClient {
  private globalOptions = { observe: 'response' };

  constructor(private http: HttpClient) {
    super();
  }

  get<T>(requestData: RequestData<HttpOptions>): ResponseClientModel<T> {
    const { resource, options } = requestData;
    const data$ = this.http.get<T>(resource, this.getOptions(options)).pipe(
      map(this.handlerSuccessRequest),
      catchError(this.handlerFailRequest)
    );
    return { result: data$ };
  }

  save<T>(requestData: RequestData<HttpOptions>): ResponseClientModel<T> {
    const { resource, options, data } = requestData;
    const data$ = this.http.post<T>(resource, data, this.getOptions(options)).pipe(
      map(this.handlerSuccessRequest),
      catchError(this.handlerFailRequest)
    );
    return { result: data$ };
  }

  update<T>(requestData: RequestData<HttpOptions>): ResponseClientModel<T> {
    const { resource, options, data } = requestData;
    const data$ = this.http.put<T>(resource, data, this.getOptions(options)).pipe(
      map(this.handlerSuccessRequest),
      catchError(this.handlerFailRequest)
    );
    return { result: data$ };
  }

  private handlerSuccessRequest<T>(res: HttpResponse<T>) {
    const { status, body } = res;
    return { success: true, data: body, status };
  }

  private handlerFailRequest(res: HttpErrorResponse) {
    const { message, status } = res;
    return of({ success: false, error: message, status });
  }

  private getOptions(options: any) {
    const { globalOptions } = this;
    if (!!options) {
      return { ...globalOptions, ...options };
    }
    return globalOptions;
  }

}
