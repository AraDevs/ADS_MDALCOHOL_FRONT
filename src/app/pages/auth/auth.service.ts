import { Injectable } from '@angular/core';
import { RequestClient, RequestData } from '@core/client';
import { environment } from '@environments/environment';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { USER_TYPE_KEY, NAME_KEY, TOKEN_KEY } from '@shared/constants';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private resource = environment.host + '/login';

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

  getUserType() {
    const userType = localStorage.getItem(USER_TYPE_KEY);
    if (userType != null) {
      return userType.toUpperCase();
    }
    return userType;
  }

  isAuthenticated() {
    return this.getToken() !== null;
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(NAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_TYPE_KEY);
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
    localStorage.setItem(NAME_KEY, name);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_TYPE_KEY, userType);
  }
}
