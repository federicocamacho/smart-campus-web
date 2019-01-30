import { Component } from '@angular/core';

import { AppService } from '../../app.service';
import { ApplicationService } from 'src/app/core/api/application.service';
import { WizardService } from '../../core/services/wizard.service';

@Component({
  selector: 'sc-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {

  /**
   * Creates an instance of ApplicationsComponent.
   * @date 2019-01-29
   * @param appService Application's main service.
   * @param applicationService Applications (entity) service.
   * @param wizard Wizard main service.
   * @memberof ApplicationsComponent
   */
  constructor(
    private appService: AppService,
    public applicationService: ApplicationService,
    private wizard: WizardService) { }

  /**
   * Navigates to the wizard page that's required for creating a new application.
   *
   * @date 2019-01-29
   * @memberof ApplicationsComponent
   */
  public createApplication(): void {
    this.wizard.navigate(0, 0);
  }

  /**
   * Deletes the app identified by it's id.
   *
   * @date 2019-01-29
   * @param appId id of the app to be deleted.
   * @memberof ApplicationsComponent
   */
  public deleteApplication(appId: number): void {
    // TODO: Delete the application.
  }

  /**
   * Opens the wizard (in Application section) for the given app id.
   *
   * @date 2019-01-29
   * @param appId id of the app to be opened.
   * @memberof ApplicationsComponent
   */
  public openApplication(appId: number): void {
    this.wizard.navigate(0, appId);
  }

  /**
   * Trigerred when lazy loading is executed in the applications list, retrieves the next page of 'Applications'.
   *
   * @date 2019-01-28
   * @memberof MenuComponent
   */
  public onLoadMore(): void {
    const pageToLoad = this.appService.lastMenuPageLoaded + 1;
    this.appService.populateMenu(this.appService.user.id, pageToLoad);
  }

}
