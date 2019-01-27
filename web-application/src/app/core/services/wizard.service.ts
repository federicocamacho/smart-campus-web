import { Injectable } from '@angular/core';

import { CoreModule } from '../core.module';
import { Application } from '../models/application';
import { Router } from '@angular/router';
import { MenuType } from '../utils/menu-type';

/**
 * Service to store all the information and general functions in Wizard section.
 *
 * @date 2019-01-26
 * @export
 * @class WizardService
 */
@Injectable({
  providedIn: CoreModule
})
export class WizardService {

  /**
   * Id of the application opened in the wizard.
   *
   * @memberof WizardComponent
   */
  public id: number;

  /**
   * Stores the application to be created/updated.
   *
   * @memberof WizardService
   */
  public application: Application;

  
  /**
   * Stores the selected step (index) to keep the state when chaning between
   * vertical and horizontal stepper (due responsive).
   *
   * @memberof WizardComponent
   */
  public selectedIndex: number;

  /**
   * Creates an instance of WizardService.
   * @date 2019-01-26
   * @param router Angular Router.
   * @memberof WizardService
   */
  constructor(private router: Router) {
    this.selectedIndex = 0;
    this.application = new Application();
  }

  /**
   * Navigate in the wizard.
   *
   * @date 2019-01-26
   * @param index of the section.
   * @param [id=this.id] id of the application, the default is the current one.
   * @memberof WizardService
   */
  public navigate(index: number, id: number = this.id): void {
    this.router.navigate(
      [ 'applications', id.toString(), MenuType.getPathFromIndex(index) ],
      {
        replaceUrl: true
      }
    );
  }

}
