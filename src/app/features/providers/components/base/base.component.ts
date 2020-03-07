import { Component, OnInit } from '@angular/core';
import * as state from '@features/providers/state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '@state/app-state';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  providers$: Observable<any[]>;
  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.providers$ = this.store$.pipe(select(state.selectProviders));

    this.store$.dispatch(state.LoadProviders());
  }
}
