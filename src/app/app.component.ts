import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MENU } from '@config/menu-config';
import { Store } from '@ngrx/store';
import { SetLoggedUser } from '@state/global.actions';

@Component({
  selector: 'md-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menu = MENU;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<any>) {
    this.store.dispatch(SetLoggedUser({ username: 'Moises' }));
  }
}
