import { Component } from '@angular/core';

import { WizardService } from '../../../core/services/wizard.service';

@Component({
  selector: 'sc-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {

  /**
   * Creates an instance of ApplicationComponent.
   * @date 2019-01-26
   * @param appService Application's main service.
   * @param wizard Wizard main service.
   * @memberof ApplicationComponent
   */
  constructor(public wizard: WizardService) {}

}
