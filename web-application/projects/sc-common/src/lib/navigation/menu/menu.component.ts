import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';

import { MenuItem } from './menu-item';
import { Cleanable } from '../../utils/cleanable';
import { Utils } from '../../utils/utils';

/**
 * Sidebar Menu Component
 *
 * @date 2018-10-30
 * @export
 */
@Component({
  selector: 'sc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent extends Cleanable implements OnInit, OnDestroy {

  /**
   * Navbar's background color as a string (receives HEX and color names).
   *
   * @memberof MenuComponent
   */
  @Input() backgroundColor: string;

  /**
   * Navbar icons' color (Material Design Icons) (receives HEX and color names).
   *
   * @memberof MenuComponent
   */
  @Input() iconsColor: string;

  /**
   * Indicates wether the menu is opened or not.
   *
   * @memberof MenuComponent
   */
  @Input() isOpened: boolean;

  /**
   * Items to be showed as options in the Side menu.
   *
   * @memberof MenuComponent
   */
  @Input() menuItems: MenuItem[];

  @Output() menuClosed: EventEmitter<void>;

  constructor(private bpObserver: BreakpointObserver, private router: Router) {
    super();
    this.menuClosed = new EventEmitter();
  }

  ngOnInit() {
    this.bpObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(value => value.matches), takeUntil(this.destroyed))
      .subscribe(isMobile => this.emitIfIsMobile(isMobile));
  }

  /**
   * Used to emit the {@link menuClosed} {@link EventEmitter} when the device's
   * viewport correspond to the usual breakpoints of Mobile devices.
   *
   * @date 2018-10-31
   * @param isMobile whether the device is a mobile (or has a matching size) or not.
   * @memberof MenuComponent
   */
  public emitIfIsMobile(isMobile: boolean): void {
    if (isMobile) {
      this.menuClosed.next();
    }
  }

  /**
   * Executed when a parent {@link MenuItem} is clicked.
   *
   * @date 2018-11-17
   * @param item the {@link MenuItem} clicked.
   * @memberof MenuComponent
   */
  public parentNodeClicked(item: MenuItem): void {
    if (item.hasChildren()) {
      item.toggleOpen();
    } else if (!Utils.isEmptyString(item.path)) {
      this.router.navigate(Utils.getPathArray(item.path));
    }
  }

  /**
   * Executed when a children {@link MenuItem} (leaf node) is clicked.
   *
   * @date 2018-11-17
   * @param item the {@link MenuItem} clicked.
   * @memberof MenuComponent
   */
  public childrenNodeClicked(item: MenuItem): void {
    if (Utils.isEmptyString(item.path)) { return; }

    this.router.navigate(Utils.getPathArray(item.path));
  }
}
