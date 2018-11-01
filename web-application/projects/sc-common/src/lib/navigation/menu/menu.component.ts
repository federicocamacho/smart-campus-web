import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { MenuItem } from './menu-item';
import { RxJsUtil } from '../../utils/rxjs-util';

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

export class MenuComponent implements OnInit, OnDestroy {

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

  /**
   * {@link Subscription } used to detect when the device has small screen.
   *
   * @memberof MenuComponent
   */
  private smScreenSubscription: Subscription;

  constructor(private bpObserver: BreakpointObserver) {
    this.menuClosed = new EventEmitter();
  }

  ngOnInit() {
    this.smScreenSubscription = this.bpObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(value => value.matches))
      .subscribe(isMobile => this.emitIfIsMobile(isMobile));
  }

  ngOnDestroy() {
    RxJsUtil.unsubscribe(this.smScreenSubscription);
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
