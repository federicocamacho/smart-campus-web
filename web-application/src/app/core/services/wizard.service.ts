import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Application } from '../models/application';
import { CoreModule } from '../core.module';
import { Utils } from '../utils/utils';

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
   * Indicates if the previous step in the wizard is currently accessible.
   *
   * @memberof WizardService
   */
  public isPrevEnabled: boolean;

  /**
   * Indicates if the next step in the wizard is currently accessible.
   *
   * @memberof WizardService
   */
  public isNextEnabled: boolean;

  /**
   * Creates an instance of WizardService.
   * @date 2019-01-26
   * @param router Angular Router.
   * @memberof WizardService
   */
  constructor(private router: Router) {
    this.application = new Application();
    this.isPrevEnabled = true;
  }

  /**
   * Navigate in the wizard.
   *
   * @date 2019-01-26
   * @param [id=this.id] id of the application, the default is the current one.
   * @memberof WizardService
   */
  public navigate(id: number = this.id): void {
    this.router.navigate(
      [ 'applications', id.toString() ],
      {
        replaceUrl: true
      }
    );
  }

  /**
   * Returns the cached object (if found) for the given type.
   *
   * @date 2019-02-03
   * @param type of the object to be retrieved.
   * @returns the object if it's cached, null otherwise.
   * @memberof WizardService
   */
  public get(type: CacheType): any {
    switch (type) {
      case 'APPLICATION':
        return this.getCachedApplication();
      default:
        // TODO: Implement all other cases.
        return null;
    }
  }

  /**
   * Retrieves the application cached (in memory or local storage) if exists.
   *
   * @date 2019-02-03
   * @private
   * @returns the application cached if exists, null otherwise or if a parse exception occurrs.
   * @memberof WizardService
   */
  private getCachedApplication(): Application {
    if (this.application && this.application.id) {
      return this.application;
    }
    const applicationJSON = localStorage.getItem('APPLICATION');
    if (!Utils.isEmptyString(applicationJSON)) {
      try {
        const application = JSON.parse(applicationJSON);
        return new Application(application.id, application.name, application.description, application.userId);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Caches the given object for the given type.
   *
   * @date 2019-02-03
   * @param type {@link CacheType} of the object to be cached.
   * @param data to be cached.
   * @memberof WizardService
   */
  public cache(type: CacheType, data: any): void {
    switch (type) {
      case 'APPLICATION':
        this.application = data;
        break;
    }
    localStorage.setItem(type, JSON.stringify(data));
  }

  /**
   * Removes all elements from wizard cache if the current app id is different than the one stored.
   * @param currentAppId the id of the application that's opened.
   * @date 2019-02-03
   * @memberof WizardService
   */
  public clearCache(currentAppId: number): void {
    const application: Application = this.get('APPLICATION');
    if (!application || application.id !== currentAppId) {
      this.application = new Application();
      localStorage.removeItem('APPLICATION');
      // TODO: Clear all other items.
    }
  }

}

export type CacheType = 'APPLICATION' | 'GATEWAY' | 'SENSOR' | 'PROCESS';
