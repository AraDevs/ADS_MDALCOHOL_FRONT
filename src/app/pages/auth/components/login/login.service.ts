import { Injectable } from '@angular/core';
import { RequestClient, RequestData } from '@core/client';
import { environment } from '@environments/environment';
@Injectable()
export class LoginService {
  private resource = environment.host + '/login';
  constructor(private requestClient: RequestClient) {}

  login(username: string, password: string) {
    const data = new RequestData();
    data.resource = this.resource;
    data.data = { username, password };

    this.requestClient.post(data).result.subscribe((res) => {
      console.log(res);
    });
  }
}
