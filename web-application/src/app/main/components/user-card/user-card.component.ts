import { Component, Input } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { ToastyService } from 'ng2-toasty';

import { ApiError, Cleanable, Response, Utils } from './../../../core';
import { AppService } from './../../../../app/app.service';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { DialogData } from '../confirm-dialog/dialog-data';
import { UserService } from './../../../core/api';

@Component({
  selector: 'sc-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent extends Cleanable {

  /**
   * User's email.
   *
   * @memberof UserCardComponent
   */
  @Input('email') email: string;

  /**
   * User's image url.
   *
   * @memberof UserCardComponent
   */
  @Input('imageUrl') imageUrl: string;

  /**
   * User's name.
   *
   * @memberof UserCardComponent
   */
  @Input('name') name: string;

  /**
   * User's username.
   *
   * @memberof UserCardComponent
   */
  @Input('username') username: string;

  /**
   * Creates an instance of UserCardComponent.
   * @date 2019-01-19
   * @param cookie Cookie service.
   * @param dialog Material Dialog reference.
   * @param router Angular Router.
   * @param service Main Application Service.
   * @param toasty Toasty Service.
   * @param userService User API service.
   * @memberof UserCardComponent
   */
  constructor(
    private cookie: CookieService,
    private dialog: MatDialog,
    private router: Router,
    private service: AppService,
    private toasty: ToastyService, 
    private userService: UserService) {
    super();
  }

  /**
   * Event handler for Delete Profile option selection.
   *
   * @date 2018-12-31
   * @memberof UserCardComponent
   */
  public onDeleteClicked(): void {
    this.service.isUserCardOpened = false;
    const deleteDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: new DialogData(
        'Eliminar usuario',
        `Está seguro que desea eliminar el usuario ${ this.username }`,
        this.username)
    });

    deleteDialog.afterClosed()
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(result => result ? this.deleteProfile() : null);
  }

  /**
   * Navigates to the {@link ProfileComponent}.
   *
   * @date 2018-12-31
   * @memberof AppComponent
   */
  public onProfileClicked(): void {
    this.service.isUserCardOpened = false;
    this.router.navigate(['/profile']);
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
        (res: HttpResponse<Response>) => {
          if (res.ok) {
            this.onLogoutClicked();
            this.toasty
              .success(Utils.buildToastyConfig('ELIMINAR USUARIO', res.body.message));
          } else {
            this.toasty
              .error(Utils.buildToastyConfig('ERROR ELIMINANDO USUARIO', res.body.message));
          }
          this.service.isBusyGlobally = false;
        },
        (err: ApiError) => {
          this.toasty
            .error(Utils.buildToastyConfig('ERROR ELIMINANDO USUARIO', err.message));
          this.service.isBusyGlobally = false;
        }
      );
  }

  /**
   * Event handler for Logout option selection.
   *
   * @date 2018-12-31
   * @memberof UserCardComponent
   */
  public onLogoutClicked(): void {
    this.service.isUserCardOpened = false;
    this.cookie.delete('user');
    this.service.user = null;
    this.service.isLogedIn = false;
    this.router.navigate(['/login']);
  }

}
