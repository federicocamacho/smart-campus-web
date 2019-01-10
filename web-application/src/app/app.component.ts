import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { takeUntil, take } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { ToastyConfig, ToastyService } from 'ng2-toasty';

import { AppService } from './app.service';
import { ApiError, Cleanable, IResponse, Utils } from './core';
import { DeleteUserDialogComponent } from './main/components';
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
export class AppComponent extends Cleanable implements OnInit {  
  
  public title = 'Smart Campus';

  /**
   * Creates an instance of AppComponent.
   * @date 2019-01-09
   * @param cookieService User Cookie service.
   * @param dialog Material Dialog reference.
   * @param router Angular Router.
   * @param service Application's main service.
   * @param toastyConfig Toasty Configuration.
   * @param toastyService Toasty service (handler).
   * @param userService User API Service.
   * @memberof AppComponent
   */
  constructor(private cookieService: CookieService,
              private dialog: MatDialog,
              private router: Router,
              public service: AppService,
              private toastyConfig: ToastyConfig,
              private toastyService: ToastyService,
              private userService: UserService) {
    super();
    this.toastyConfig.theme = 'material';
  }

  /**
   * Component's onInit lifecycle that sets the isLogedIn flag.
   *
   * @date 2019-01-09
   * @memberof AppComponent
   */
  ngOnInit(): void {
    if (this.service.isAuthenticated()) {
      this.service.isLogedIn = true;
    }
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
    this.service.isMenuOpened = false;
    this.router.navigate(['/profile']);
  }

  /**
   * Deletes the current user.
   *
   * @date 2018-12-31
   * @memberof AppComponent
   */
  public onDeleteProfileClicked(): void {
    this.service.isUserCardOpened = false;
    // this.service.isBusyGlobally = true;
    const deleteDialog = this.dialog.open(DeleteUserDialogComponent, {
      width: '350px',
      data: { username: this.service.user.username }
    });

    deleteDialog.afterClosed()
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(result => result ? this.deleteProfile() : null);
  }

  /**
   * Deletes the user profile.
   *
   * @date 2019-01-09
   * @private
   * @memberof AppComponent
   */
  private deleteProfile(): void {
    this.service.isBusyGlobally = true;
    const id = this.service.user.id;
    this.userService.deleteUser(id)
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(
        (res: HttpResponse<IResponse>) => {
          if (res.ok) {
            this.onLogoutClicked();
            this.toastyService
              .success(Utils.buildToastyConfig('ELIMINAR USUARIO', res.body.message));
          } else {
            this.toastyService
              .error(Utils.buildToastyConfig('ERROR ELIMINANDO USUARIO', res.body.message));
          }
          this.service.isBusyGlobally = false;
        },
        (err: ApiError) => {
          this.toastyService
            .error(Utils.buildToastyConfig('ERROR ELIMINANDO USUARIO', err.message));
          this.service.isBusyGlobally = false;
        }
      );
  }

  /**
   * Proceeds to logout the current user, removing it from memory, from the user cookie and
   * setting the isLogedIn flag to false, also navigates to the login page.
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
