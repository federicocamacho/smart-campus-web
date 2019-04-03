import { ApiResponse } from 'src/app/shared/models/api-response';
import { DashboardService } from './../../../core/services/dashboard.service';
import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';

import { AppService } from './../../../../app/app.service';
import { Subscribable } from 'src/app/shared/utils/subscribable';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DialogData } from 'src/app/shared/components/confirm-dialog/dialog-data';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'sc-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent extends Subscribable {

  /**
   * User's email.
   *
   */
  @Input() email: string;

  /**
   * User's name.
   *
   */
  @Input() name: string;

  /**
   * User's username.
   *
   */
  @Input() username: string;

  /**
   * Creates an instance of UserCardComponent.
   * @param {AppService} appService - Contains the global attributes for the whole application
   * @param {DashboardService} dashboardService - Contains useful attributes and methods for the dashboard.
   * @param {MatDialog} dialog - Handles the materialize modal.
   * @param {Router} router - Allows to navigate using url.
   * @param {UserService} userService - Contains the attributes and methods to handle users.
   */
  constructor(
    private appService: AppService,
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService) {
    super();
  }

  /**
   * Event handler for Delete Profile option selection.
   *
   * @date 2018-12-31
   */
  public onDeleteClicked(): void {
    this.dashboardService.isUserCardOpened = false;
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
   */
  public onProfileClicked(): void {
    this.dashboardService.isUserCardOpened = false;
    this.router.navigate(['/profile']);
  }

  /**
   * Deletes the user profile.
   *
   * @date 2019-01-09
   */
  private deleteProfile(): void {
    this.appService.isBusy = true;
    const id = this.appService.user.id;
    this.userService.deleteUser(id)
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(
        (res: ApiResponse) => {
          if (res.successful) {
            this.onLogoutClicked();
            this.appService.showSnack('Usuario eliminado correctamente.');
          } else {
            this.appService.showSnack('Error al eliminar el usuario.' + res.message);
          }
          this.appService.isBusy = false;
        },
        (err: HttpErrorResponse) => this.appService.handleGenericError(err));
  }

  /**
   * Event handler for Logout option selection.
   *
   * @date 2018-12-31
   */
  public onLogoutClicked(): void {
    this.dashboardService.isUserCardOpened = false;
    this.appService.user = null;
    this.router.navigate(['/login']);
  }

}
