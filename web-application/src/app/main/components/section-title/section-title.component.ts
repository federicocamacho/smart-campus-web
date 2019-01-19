import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Section header (GUI) component.
 *
 * @date 2019-01-19
 * @export
 * @class SectionTitleComponent
 */
@Component({
  selector: 'sc-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent {

  /**
   * Section title.
   *
   * @memberof SectionTitleComponent
   */
  @Input('title') title: string;

  /**
   * Section description.
   *
   * @memberof SectionTitleComponent
   */
  @Input('description') description: string;

  /**
   * Emits any time the 'Create' button is selected.
   *
   * @memberof SectionTitleComponent
   */
  @Output('create') create = new EventEmitter();

  /**
   * Create button click handler.
   *
   * @date 2019-01-19
   * @memberof SectionTitleComponent
   */
  public onCreate(): void {
    this.create.emit();
  }
}