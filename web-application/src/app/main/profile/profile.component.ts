import { Component } from '@angular/core';

import { AppService } from '../../../app/app.service';
import { Cleanable, UpdateProfileInput, ChangePassInput, IResponse, ApiError, Utils } from '../../../app/core';
import { UserService } from '../../../app/core/api';
import { forkJoin, Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ToastyService } from 'ng2-toasty';

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
    const userId = this.service.user.id;
    let update: Observable<any>, change: Observable<any>;
    if (!this.updateInput.hasChanges(this.service.user)) {
      update = this.userService.updateProfile(userId, this.updateInput);
    }
    if (this.changePwd) {
      change = this.userService.changePassword(userId, new ChangePassInput(this.updateInput.password, this.newPwd));
    }

    if (update && change) {
      forkJoin(update, change)
        .pipe(
          take(1),
          takeUntil(this.destroyed))
        .subscribe(
          (res: HttpResponse<IResponse>[]) => {
            this.service.isBusyGlobally = false;
          },
          (err: ApiError) => {
            this.service.isBusyGlobally = false;
          }
        );
    } else if (update) {
      update
        .pipe(
          take(1),
          takeUntil(this.destroyed))
        .subscribe(
          (res: HttpResponse<IResponse>) => {
            this.service.isBusyGlobally = false;
          },
          (err: ApiError) => {
            this.service.isBusyGlobally = false;
          }
        );
    } else if (change) {
      change
        .pipe(
          take(1),
          takeUntil(this.destroyed))
        .subscribe(
          (res: HttpResponse<IResponse>) => {
            this.service.isBusyGlobally = false;
          },
          (err: ApiError) => {
            this.service.isBusyGlobally = false;
          }
        );
    } else {
      // no action done.
    }
  }

  public handleSuccessfulUpdate(res: HttpResponse<IResponse>): void {
    if (res.ok) {
      this.toasty.success(Utils.buildToastyConfig('ACTUALIZAR PERFIL', res.body.message));
      //const userCookie = new UserCookie(user.id, user.username, user.email, user.name, user.admin);
    }
  }

}
