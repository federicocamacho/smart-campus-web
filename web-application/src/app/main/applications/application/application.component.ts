import { Component } from '@angular/core';

import { Cleanable } from '../../../core/utils/cleanable';
import { WizardService } from '../../../core/services/wizard.service';

@Component({
  selector: 'sc-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent extends Cleanable {

  /**
   * Creates an instance of ApplicationComponent.
   * @date 2019-01-26
   * @param wizard Wizard main service.
   * @memberof ApplicationComponent
   */
  constructor(public wizard: WizardService) {
    super();
  }

}
