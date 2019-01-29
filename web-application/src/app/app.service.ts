import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { ToastyService } from 'ng2-toasty';

import { ApiError } from './core/models/api-error';
import { ApiException } from './core/utils/api-exception';
import { Application } from './core/models/application';
import { ApplicationService } from './core/api/application.service';
import { Cleanable } from './core/utils/cleanable';
import { MenuTree } from './core/models/menu-tree';
import { User } from './core/models/user';
import { UserCookie } from './core/models/user-cookie';
import { Utils } from './core/utils/utils';

/**
 * Service to handle all app-wide data and event handlers.
 *
 * @date 2018-10-31
 * @export
 */
@Injectable({
  providedIn: 'root'
})
export class AppService extends Cleanable {

  /**
   * Represents if there's an operation in progress that should block the user interaction.
   * It's binded to the display of the {@link FullScreenLoaderComponent}.
   *
   * @memberof AppService
   */
  public isBusyGlobally: boolean;

  /**
   * Represents whether the user is loged in the application or not.
   *
   * @memberof AppService
   */
  public isLogedIn: boolean;

  /**
   * Determines whether the user profile is opened or not.
   *
   * @memberof AppService
   */
  public isUserCardOpened: boolean;

  /**
   * Determines whether the side menu (of type {@link MenuComponent}) is opened (displayed) or not.
   *
   * @memberof AppService
   */
  public isMenuOpened: boolean;

  /**
   * Stores all the side menu elements.
   *
   * @memberof AppService
   */
  public menu = new MenuTree();

  /**
   * Stores the user logged in.
   *
   * @memberof AppService
   */
  public user: User;

  /**
   * Creates an instance of AppService.
   * @date 2019-01-09
   * @param applicationService Applications API service.
   * @param cookieService User Cookie service.
   * @param toastyService Toasty service.
   * @memberof AppService
   */
  constructor(
    private applicationService: ApplicationService,
    private cookieService: CookieService,
    private toastyService: ToastyService) {
    super();
    this.isBusyGlobally = false;
    this.isUserCardOpened = false;
    this.isMenuOpened = true;
  }

  /**
   * Initializes the side menu for the curren user, retrieving it's applications.
   *
   * @date 2019-01-25
   * @param userId id of the user currently logged in.
   * @param [page=0] number of the page to be retrieved (Pageable REST service).
   * @memberof AppService
   */
  public initializeMenuForUser(userId: number, page: number = 0): void {
    this.applicationService.getApplicationsByUser(userId, page)
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(
        (res: HttpResponse<Application[]>) => {
          const applications = res.body;
          this.applicationService.applications = applications;
          this.menu.items = Utils.populateApplications(applications);
          this.isBusyGlobally = false;
        },
        (err: ApiError) => {
          if (err.is(ApiException.INTERNAL)) {
            this.toastyService.error(Utils.buildToastyConfig(
              'ERROR OBTENIENDO APLICACIONES', err[0].message));
          }
          this.isBusyGlobally = false;
        }
      );
  }

  /**
   * Indicates if the user is authenticated or not checking if the {@link UserCookie} exists.
   *
   * @date 2019-01-09
   * @returns true if the user is authenticated, false otherwise.
   * @memberof AppService
   */
  public isAuthenticated(): boolean {
    if (this.cookieService.check('user')) {
      const user: UserCookie = UserCookie.fromJSON(this.cookieService.get('user'));
      return user != null;
    }
    return false;
  }

  /**
   * Determines if the given form (NgForm) is invalid or not.
   *
   * @date 2019-01-10
   * @param form {@link NgForm} to be evaluated.
   * @returns true if the form is invalid, false otherwise.
   * @memberof LoginComponent
   */
  public isFormInvalid(form: NgForm): boolean {
    return form.form.invalid;
  }

  /**
   * Determines if the given model (NgModel) is invalid or not.
   *
   * @date 2019-01-10
   * @param model {@link NgModel} to be evaluated.
   * @returns true if the model is invalid, false otherwise.
   * @memberof LoginComponent
   */
  public isModelInvalid(model: NgModel): boolean {
    return model.invalid && (model.dirty || model.touched);
  }
  
}
