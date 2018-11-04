import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';

import { MenuItem } from './menu-item';
import { Cleanable } from '../../utils/cleanable';

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

  constructor(private bpObserver: BreakpointObserver) {
    super();
    this.menuClosed = new EventEmitter();
  }

  ngOnInit() {
    this.bpObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(value => value.matches), takeUntil(this.destroy))
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
}
