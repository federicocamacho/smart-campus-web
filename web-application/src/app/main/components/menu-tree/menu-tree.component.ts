import { Component, Input } from '@angular/core';

import { MenuItem } from '../../../core/models/menu-item';

@Component({
  selector: 'sc-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent {

  /**
   * Indicates whether the device is a mobile or not.
   *
   * @memberof MenuTreeComponent
   */
  @Input() isMobile: boolean;

  /**
   * Stores the current menu item.
   *
   * @memberof MenuTreeComponent
   */
  @Input() item: MenuItem;

  /**
   * Opens/closes the {@link MenuItem} if has any children.
   *
   * @date 2019-01-19
   * @memberof MenuComponent
   */
  public nodeToggled(): void {
    this.item.toggleExpand();
  }

}
