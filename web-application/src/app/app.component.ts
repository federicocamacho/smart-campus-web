import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { takeUntil, map } from 'rxjs/operators';

import { ToastyConfig } from 'ng2-toasty';

import { AppService } from './app.service';
import { Cleanable } from './core/utils/cleanable';
import { CookieService } from 'ngx-cookie-service';
import { UserCookie } from './core/models/user-cookie';
import { Utils } from './core/utils/utils';

/**
 * Application's main Component
 *
 * @date 2018-06-28
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends Cleanable implements OnInit {  
  
  public title = 'Smart Campus';

  public isMobile: boolean;

  /**
   * Creates an instance of AppComponent.
   * @date 2019-01-19
   * @param appService Application's main service.
   * @param bpObserver to notify the GUI when it's a mobile device.
   * @param cookie Cookie service.
   * @param toastyConfig Toasty configurator.
   * @memberof AppComponent
   */
  constructor(
    public appService: AppService,
    private bpObserver: BreakpointObserver,
    private cookie: CookieService,
    private toastyConfig: ToastyConfig) {
    super();
    this.toastyConfig.theme = 'material';
  }

  /**
   * Component's onInit lifecycle that sets the isLogedIn flag
   * and initializes the observer for mobile devices.
   *
   * @date 2019-01-09
   * @memberof AppComponent
   */
  ngOnInit(): void {
    if (this.appService.isAuthenticated()) {
      this.appService.isLogedIn = true;
      const cookie = UserCookie.fromJSON(this.cookie.get('user'));
      this.appService.user = Utils.userFromCookie(cookie);
      this.appService.initializeMenuForUser(this.appService.user.id);
    }

    this.bpObserver
      .observe([ Breakpoints.XSmall, Breakpoints.Small ])
      .pipe(
        map(value => value.matches),
        takeUntil(this.destroyed)) // do not use take(1) as multiple values are received.
      .subscribe(isMobile => this.isMobile = isMobile);
  }

  /**
   * Triggers a change in the side menu's visibility.
   *
   * @date 2018-10-31
   * @memberof AppService
   */
  public toggleSideMenu(): void {
    this.appService.isMenuOpened = !this.appService.isMenuOpened;
  }

  /**
   * Triggers a change in the user profile card's visibility.
   *
   * @date 2018-10-31
   * @param event that was executed.
   * @memberof AppService
   */
  public toggleUserCard(event: Event): void {
    this.appService.isUserCardOpened = !this.appService.isUserCardOpened;
    event.stopPropagation();
  }
  
  /**
   * Hides the side menu.
   *
   * @date 2018-10-31
   * @memberof AppService
   */
  public closeMenu(): void {
    this.appService.isMenuOpened = false;
  }

  /**
   * Closes the user card component when a click was done in any other component.
   *
   * @date 2018-12-31
   * @param event that was executed.
   * @memberof AppComponent
   */
  public closeUserCard(event: Event): void {
    if (this.appService.isUserCardOpened) {
      this.appService.isUserCardOpened = false; 
    }
  }

}
