import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { ToastyConfig } from 'ng2-toasty';

import { AppService } from './app.service';
import { AuthService } from './core';
import { UserService } from './core/api';

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
export class AppComponent implements OnInit {  
  
  public title: string;

  constructor(private auth: AuthService,
              private cookieService: CookieService,
              private router: Router,
              public service: AppService,
              private toastyConfig: ToastyConfig,
              private userService: UserService) {
    this.title = 'Smart Campus';
    this.toastyConfig.theme = 'material';
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) { this.service.isLogedIn = true; }
  }

  /**
   * Triggers a change in the side menu's visibility.
   *
   * @date 2018-10-31
   * @memberof AppService
   */
  public toggleSideMenu(): void {
    this.service.isMenuOpened = !this.service.isMenuOpened;
  }

  /**
   * Triggers a change in the user profile card's visibility.
   *
   * @date 2018-10-31
   * @param event that was executed.
   * @memberof AppService
   */
  public toggleUserCard(event: Event): void {
    this.service.isUserCardOpened = !this.service.isUserCardOpened;
    event.stopPropagation();
  }
  
  /**
   * Hides the side menu.
   *
   * @date 2018-10-31
   * @memberof AppService
   */
  public closeMenu(): void {
    this.service.isMenuOpened = false;
  }

  /**
   * Closes the user card component when a click was done in any other component.
   *
   * @date 2018-12-31
   * @param event that was executed.
   * @memberof AppComponent
   */
  public closeUserCard(event: Event): void {
    if (this.service.isUserCardOpened) {
      this.service.isUserCardOpened = false; 
    }
  }

  /**
   * Navigates to the {@link ProfileComponent}.
   *
   * @date 2018-12-31
   * @memberof AppComponent
   */
  public onProfileClicked(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Deletes the current user.
   *
   * @date 2018-12-31
   * @memberof AppComponent
   */
  public onDeleteProfileClicked(): void {
    // TODO Show a confirmation and then proceed to delete the profile if the user confirme.
  }

  /**
   * Proceeds to logout the current user.
   *
   * @date 2018-12-31
   * @memberof AppComponent
   */
  public onLogoutClicked(): void {
      this.service.isUserCardOpened = false;
      this.cookieService.delete('user');
      this.service.user = null;
      this.service.isLogedIn = false;
      this.router.navigate(['/login']);
  }

}

