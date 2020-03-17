import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersState } from '@features/users/state';

@Injectable()
export class FormService {

  constructor(private store$: Store<UsersState>) { }

  getUser(data: any){
    const{ user } = data;
    return{
      id: user.id,
      username: user.username,
      name: user.name,
      pass: user.pass,
      user_type: user.userType,
      state: user.state
    }
  }

  getUserDTO(user: any)
  {
    return{
      username: user.user_name,
      name: user.name,
      pass: user.password,
      user_type: user.user_type.value,
      state: user.state ? 1 : 0
    }
  }
}
