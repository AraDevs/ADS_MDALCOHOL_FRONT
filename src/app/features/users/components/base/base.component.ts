import { Component, OnInit } from '@angular/core';
import { LoadUser, LoadUsers, selectUser, selectUsers } from '@features/users/state';
import { select, Store } from '@ngrx/store';
import { selectError } from '@state/index';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  users$ = this.store$.pipe(select(selectUsers));
  user$ = this.store$.pipe(
    select(selectUser),
    filter(user => user != null)
  );


  constructor(private store$: Store<any>) {
  }

  ngOnInit(): void {
    this.store$.dispatch(LoadUsers());
    this.store$.dispatch(LoadUser({ data: { id: 1 } }));
  }

}
