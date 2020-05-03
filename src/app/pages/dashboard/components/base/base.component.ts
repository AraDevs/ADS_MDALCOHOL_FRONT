import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { MENU_ITEMS } from '@config/menu-config';
import { ADMINISTRATION, PRODUCTION } from '@shared/constants';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit {
  menuItems = MENU_ITEMS;
  userType = this.authService.getUserType();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.redirect();
  }

  redirect() {
    const segments = this.router.url.split('/');
    const route = segments[segments.length - 1];
    const find = this.menuItems.productions.find(
      (item) => item.route === route && item.userType === this.userType
    );

    if (find !== undefined) {
      return;
    }

    const routeToRedirect =
      this.userType === PRODUCTION
        ? this.menuItems.productionRouteRedirect
        : this.menuItems.administrationRouteRedirect;

    this.router.navigate([routeToRedirect], { relativeTo: this.activeRoute });
  }

  isAdministration() {
    return this.userType === ADMINISTRATION;
  }

  logout() {
    this.authService.logout();
  }
}
