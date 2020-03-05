import {RequestClient, RequestConfig, ResponseClientModel} from '@core/client/request-client';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';

interface RequestHttpConfig {
  resource: string;
  data?: any;
  options: {
    headers?: any;
    reportProgress?: boolean;
  };
}


@Injectable()
export class RequestHttpClient extends RequestClient {
  private globalOptions = {observe: 'response'};

  constructor(private http: HttpClient) {
    super();
  }

  get<T>(requestConfig: RequestConfig<RequestHttpConfig>): ResponseClientModel<T> {
    const {resource, options} = requestConfig.data;
    const validOptions = this.getOptions(options);

    const data$ = this.http.get<T>(resource, validOptions).pipe(
      map((res: HttpResponse<T>) => {
          const {status, body} = res;
          return {success: true, data: body, status};
        }
      ),
      catchError((res: HttpErrorResponse) => {
        const {message, status} = res;
        const data = {success: false, error: message, status};
        return of(data);
      })
    );

    return {result: data$};
  }

  private getOptions(options: any) {
    const {globalOptions} = this;
    if (!!options) {
      return {...globalOptions, ...options};
    }
    return globalOptions;
  }

}
