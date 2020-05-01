import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { CATALOGS, MENU_ROUTER_CONFIG } from '@config/menu-config';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  styles: [],
})
export class BaseComponent {
  menu = MENU_ROUTER_CONFIG;
  catalogs = CATALOGS;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
