import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { ToastyService } from 'ng2-toasty';
import { CookieService } from 'ngx-cookie-service';

import { ApiError } from '../../core/models/api-error';
import { ApiException } from '../../core/utils/api-exception';
import { AppService } from '../../../app/app.service';
import { ChangePassInput, UpdateProfileInput } from '../../core/models/auth';
import { Cleanable } from '../../core/utils/cleanable';
import { Response } from '../../core/models/response';
import { User } from '../../core/models/user';
import { UserCookie } from '../../core/models/user-cookie';
import { UserService } from '../../../app/core/api/user.service';
import { Utils } from '../../../app/core/utils/utils';

/**
 * User profile component. Path /profile.
 *
 * @date 2018-12-31
 * @export
 * @class ProfileComponent
 */
@Component({
  selector: 'sc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends Cleanable {

  public changePwd: boolean;
  
  public username: string;
  
  public updateInput = new UpdateProfileInput();

  public newPwd: string;

  public validationError: string;

  /**
   * Creates an instance of ProfileComponent.
   * @date 2019-01-09
   * @param service Application main service.
   * @memberof ProfileComponent
   */
  constructor(
    private cookieService: CookieService,
    public service: AppService,
    private toasty: ToastyService,
    public userService: UserService) {
    super();
    this.username = '@' + this.service.user.username;
    this.updateInput.email = this.service.user.email;
    this.updateInput.name = this.service.user.name;
    this.updateInput.username = this.service.user.username;
  }

  /**
   * Updates the user profile verifying the flag {@link changePwd} to also update the password.
   *
   * @date 2019-01-14
   * @memberof ProfileComponent
   */
  public doUpdate(): void {
    this.service.isBusyGlobally = true;
    let update: Observable<any>, change: Observable<any>;
    if (this.updateInput.hasChanges(this.service.user)) {
      update = this.userService.updateProfile(this.service.user.id, this.updateInput);
    }
    if (this.changePwd) {
      change = this.userService.changePassword(
        this.service.user.id,
        new ChangePassInput(this.updateInput.password, this.newPwd));
    }

    if (update && change) {
      this.updateAndChangePassword(update, change);
    } else if (update) {
      this.updateProfile(update);
    } else if (change) {
      this.changePassword(change);
    } else {
      this.toasty.info(Utils.buildToastyConfig('ACTUALIZAR PERFIL', 'EL perfil no fué actualizado, no hay cambios'));
    }
  }

  /**
   * Proceeds to execute the HTTP Request to update the user's profile.
   *
   * @date 2019-01-16
   * @private
   * @param updateObservable Observable for the required request.
   * @memberof ProfileComponent
   */
  private updateProfile(updateObservable: Observable<any>): void {
    updateObservable
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(
        (res: HttpResponse<User>) => {
          this.handleSuccessfulUpdate(res);
          this.service.isBusyGlobally = false;
        },
        (err: ApiError) => {
          this.handleFailedUpdate(err);
          this.service.isBusyGlobally = false;
        }
      );
  }

  /**
   * Proceeds to execute the HTTP Request to change the user's password.
   *
   * @date 2019-01-16
   * @private
   * @param changeObservable Observable for the required update.
   * @memberof ProfileComponent
   */
  private changePassword(changeObservable: Observable<any>): void {
    changeObservable
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(
        (res: HttpResponse<Response>) => {
          this.handleSuccessfulPwdChange(res);
          this.service.isBusyGlobally = false;
        },
        (err: ApiError) => {
          this.handleFailedUpdate(err);
          this.service.isBusyGlobally = false;
        }
      );
  }

  /**
   * Proceeds to execute the HTTP Request to update the user's profile and password.
   *
   * @date 2019-01-16
   * @private
   * @param updateObservable Observable for the required update profile request.
   * @param changeObservable Observable for the required update password request.
   * @memberof ProfileComponent
   */
  private updateAndChangePassword(updateObservable: Observable<any>, changeObservable: Observable<any>): void {
    forkJoin(updateObservable, changeObservable)
    .pipe(
      take(1),
      takeUntil(this.destroyed))
    .subscribe(
      (res: [HttpResponse<User>, HttpResponse<Response>]) => {
        // handle password update first
        const changePwdRes: HttpResponse<Response> = res[1];
        this.handleSuccessfulPwdChange(changePwdRes);
        // then handle profile update
        const updateProfileRes: HttpResponse<User> = res[0];
        this.handleSuccessfulUpdate(updateProfileRes);
        this.service.isBusyGlobally = false;
      },
      (err: ApiError) => {
        this.handleFailedUpdate(err);
        this.service.isBusyGlobally = false;
      }
    );
  }

  /**
   * Handles the {@link HttpResponse} when the user's profile was updated successfully,
   * setting the in-memory user to the new one and also refreshing the user cookie.
   *
   * @date 2019-01-16
   * @private
   * @param res HttpResponse that contains the updated {@link User}
   * @memberof ProfileComponent
   */
  private handleSuccessfulUpdate(res: HttpResponse<User>): void {
    const user = res.body;
    if (!user) {
      this.toasty.error(Utils.buildToastyConfig('ACTUALIZAR PERFIL', 'Un error ocurrió actualizando el usuario.'));
      return;
    }
    const userCookie = UserCookie.fromUser(user);
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);
    this.cookieService.set('user', JSON.stringify(userCookie), expirationDate);
    this.service.user = user;
    this.toasty.success(Utils.buildToastyConfig('ACTUALIZAR PERFIL', 'Perfil actualizado exitosamente.'));
  }

  /**
   * Handles the {@link HttpResponse} when the user's password was changed successfully,
   *
   * @date 2019-01-16
   * @private
   * @param res HttpResponse to be handled.
   * @memberof ProfileComponent
   */
  private handleSuccessfulPwdChange(res: HttpResponse<Response>): void {
    const message = Utils.buildToastyConfig('ACTUALIZAR CONTRASEÑA', res.body.message);
    if (res.ok) {
      this.toasty.success(message);
    } else {
      this.toasty.error(message);
    }
  }

  /**
   * Handles the {@link ApiError} obtained when the update for user's profile or password failed.
   *
   * @date 2019-01-16
   * @private
   * @param error to be handled.
   * @memberof ProfileComponent
   */
  private handleFailedUpdate(error: ApiError): void {
    if (error.is(ApiException.ILLEGAL_ARGUMENT, ApiException.INVALID_KEY)) {
      this.validationError = error.message;
    } else {
      this.toasty.error(Utils.buildToastyConfig('ERROR ACTUALIZANDO PERFIL', error.message));
    }
  }

}
