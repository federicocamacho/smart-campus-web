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
   * @param item to be opened/closed.
   * @memberof MenuComponent
   */
  public nodeToggled(item: MenuItem): void {
    if (item.hasChildren()) {
      item.toggleExpand();
    }
  }

  /**
   * Executed when a {@link MenuItem} (leaf or parent node) is clicked.
   *
   * @date 2018-11-17
   * @param item the {@link MenuItem} clicked.
   * @memberof MenuComponent
   */
  public nodeClicked(item: MenuItem): void {
    if (!Utils.isEmptyArray(item.path)) { 
      this.router.navigate(item.path);

    }
  }

  /**
   * Calculates the offset (in pixels) used as 'left'property for the item's name.
   *
   * @date 2019-01-23
   * @param item {@link MenuItem} which offset is calculated.
   * @returns the string with the required offset in pixels.
   * @memberof MenuTreeComponent
   */
  public textCssOffset(item: MenuItem): string {
    return 50 + 20 * (item.level - 1) + 'px';
  }

  /**
   * Calculates the width (in pixels) for the item's name.
   *
   * @date 2019-01-23
   * @param item {@link MenuItem} which width is calculated.
   * @returns the string with the required offset in pixels.
   * @memberof MenuTreeComponent
   */
  public textCssWidth(item: MenuItem): string {
    return (255 - (50 + 20 * (item.level - 1)) - 30) + 'px';
  }

  /**
   * Calculates the offset (in pixels) used as 'left'property for the item's icon.
   *
   * @date 2019-01-23
   * @param item {@link MenuItem} which offset is calculated.
   * @returns the string with the required offset in pixels.
   * @memberof MenuTreeComponent
   */
  public iconCssOffset(item: MenuItem): string {
    return 5 + 15 * (item.level - 1) + 'px';
  }

}
