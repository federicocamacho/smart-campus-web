import { Component } from '@angular/core';

import { AppService } from '../../app.service';
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
   * @param wizard Wizard main service.
   * @memberof ApplicationsComponent
   */
  constructor(
    public appService: AppService,
    private wizard: WizardService) { }

  /**
   * Navigates to the wizard page that's required for creating a new application.
   *
   * @date 2019-01-29
   * @memberof ApplicationsComponent
   */
  public createApplication(): void {
    this.wizard.navigate(0);
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
    this.wizard.navigate(appId);
  }

}
