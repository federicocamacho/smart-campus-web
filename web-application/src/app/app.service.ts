import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { ToastyService } from 'ng2-toasty';

import { 
  ApiError,
  ApiException,
  Application,
  Cleanable,
  MenuItem,
  MenuTree,
  MenuType,
  User,
  UserCookie,
  Utils  } from './core';
import { forkJoin } from 'rxjs';
import { ApplicationService } from './core/api';

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
    if (this.isAuthenticated()) {
      const cookie = UserCookie.fromJSON(this.cookieService.get('user'));
      this.user = Utils.userFromCookie(cookie);
    }
    this.initializeApp();
  }

  /**
   * Creates all menu items creating the default one if the user is not loged in
   * or requesting all the required objects to populate it if the user is loged in.
   *
   * @date 2018-10-31
   * @memberof AppService
   */
  public initializeApp(): void {
    this.menu.items = [
      new MenuItem(0, MenuType.APPLICATIONS, ['/applications'], 'computer', 1, null)
    ];

    if (this.isAuthenticated()) {
      this.initializeMenuForUser(this.user.id);
    }
  }

  private initializeMenuForUser(userId: number): void {
    forkJoin(
      this.applicationService.getApplicationsByUser(userId))
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(
        (res: [HttpResponse<Application[]>]) => {
          this.populateApplications(res[0].body);
          this.isBusyGlobally = false;
        },
        (err: [ApiError]) => {
          if (err[0].is(ApiException.INTERNAL)) {
            this.toastyService.error(Utils.buildToastyConfig(
              'ERROR OBTENIENDO APLICACIONES', err[0].message));
          }
          this.isBusyGlobally = false;
        }
      );
  }

  private populateApplications(applications: Application[]) {
    this.applicationService.applications = applications;
    if (!Utils.isEmptyArray(applications)) {
      const applicationsMenu = this.menu.items.find(item => item.name === MenuType.APPLICATIONS);
      const applicationsAsMenuItems = applications
        .map(application => new MenuItem(
          application.idApplication,
          application.name,
          [ '/applications', application.idApplication.toString() ],
          'cloud_queue', 2,
          [
            new MenuItem(0, 'test', [ '/as/test' ], null, 2, null),
            new MenuItem(0, 'test', [ '/as/test' ], null, 2, null),
          ]));
      applicationsMenu.children = applicationsAsMenuItems;
      console.log(this.menu);
    }
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
    return form.form.invalid && (form.form.dirty || form.form.touched);
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
