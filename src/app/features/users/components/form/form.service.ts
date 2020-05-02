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
      password: user.password,
      usertype: {
        label: user.user_type,
        value: user.user_type
      },
      state: !!user.state
    }
  }

  getUserDTO(user: any)
  {
    return{
      username: user.username,
      name: user.name,
      password: user.password,
      user_type: user.usertype.value,
      state: user.state ? 1 : 0
    }
  }
}
