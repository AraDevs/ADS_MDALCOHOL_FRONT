import { Injectable } from '@angular/core';
import { RequestClient, RequestData } from '@core/client';
@Injectable()
export class LoginService {
  constructor(private requestClient: RequestClient) {}

  login(username: string, password: string) {
    const data = new RequestData();
    data.resource = '';
    data.data = { username, password };

    this.requestClient.post(data);
  }
}
