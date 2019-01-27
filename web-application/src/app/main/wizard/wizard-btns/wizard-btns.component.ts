import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Buttons used to navigate in the different tabs (steps).
 *
 * @date 2019-01-24
 * @export
 * @class WizardBtnsComponent
 */
@Component({
  selector: 'sc-wizard-btns',
  templateUrl: './wizard-btns.component.html',
  styleUrls: ['./wizard-btns.component.scss']
})
export class WizardBtnsComponent {

  @Input('isSaveVisible') isSaveVisible: boolean;

  @Input('section') section: number;

  @Input('length') length: number;

  @Output('save') save = new EventEmitter();

  @Output('next') next = new EventEmitter();

  @Output('prev') prev = new EventEmitter();

}
