import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {LoadUsers, selectUsers} from '@features/users/state';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  users$ = this.store$.pipe(select(selectUsers));

  constructor(private store$: Store<any>) {
  }

  ngOnInit(): void {
    this.store$.dispatch(LoadUsers());
  }

}
