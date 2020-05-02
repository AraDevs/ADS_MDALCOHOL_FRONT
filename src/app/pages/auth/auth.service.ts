import { Injectable } from '@angular/core';
import { RequestClient, RequestData } from '@core/client';
import { environment } from '@environments/environment';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private resource = environment.host + '/login';
  private TOKEN_KEY = 'TOKEN_KEY';
  private USER_TYPE_KEY = 'USER_TYPE_KEY';
  private NAME_KEY = 'NAME_KEY';

  constructor(private requestClient: RequestClient, private router: Router) {}

  login(username: string, password: string) {
    return this.requestLogin(username, password).pipe(
      tap(({ success, data }) => {
        if (success) {
          this.saveUserInfo(data);
        }
      }),
      map(({ error, success }) => {
        if (success) {
          return { success };
        }
        return { success, error };
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_TYPE_KEY);
    this.router.navigateByUrl('/auth');
  }

  private requestLogin(username: string, password: string) {
    const data = new RequestData();
    data.resource = this.resource;
    data.data = { username, password };
    return this.requestClient.post(data).result;
  }

  private saveUserInfo(data: any) {
    const { name, token, user_type: userType } = data;
    localStorage.setItem(this.NAME_KEY, name);
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_TYPE_KEY, userType);
  }
}
