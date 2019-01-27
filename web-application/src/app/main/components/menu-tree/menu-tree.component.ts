import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from '../../../../app/core/models/menu-item';
import { Utils } from '../../../../app/core/utils/utils';

@Component({
  selector: 'sc-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent {

  /**
   * Stores the current menu item.
   *
   * @memberof MenuTreeComponent
   */
  @Input() item: MenuItem;

  /**
   * Creates an instance of MenuTreeComponent.
   * @date 2019-01-23
   * @param router Angular Router.
   * @memberof MenuTreeComponent
   */
  constructor(private router: Router) {}

  /**
   * Opens/closes the {@link MenuItem} if has any children.
   *
   * @date 2019-01-19
   * @memberof MenuComponent
   */
  public nodeToggled(): void {
    if (this.item.hasChildren()) {
      this.item.toggleExpand();
    }
  }

  /**
   * Calculates the padding-left style used for styling different tree levels.
   *
   * @date 2019-01-27
   * @returns the offset as px suffixed string.
   * @memberof MenuTreeComponent
   */
  public getCssOffset(): string {
    return (15 * (this.item.level - 1)) + 'px';
  }

}
