import { Injectable } from '@angular/core';
import { AppState } from '@state/app-state';
import { Store } from '@ngrx/store';
import { usersFeature } from '@features/users/state';

@Injectable()
export class FormService {

  constructor(private store$: Store<AppState>) { }

  getSeller(data: any)
  {
    const{ seller } = data;
    return{
      id: seller.id,
      name: seller.name,
      seller_code: seller.seller_code,
      state: !!seller.state,
    }

  }

  getSellerDTO(seller: any)
  {
    return{
      name: seller.name,
      seller_code: seller.seller_code,
      state: seller.state ? 1 : 0
    }
  }
}
