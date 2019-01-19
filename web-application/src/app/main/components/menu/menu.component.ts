import { 
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output 
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';

import { Cleanable, MenuItem, Utils } from '../../../core/';

/**
 * Sidebar Menu Component
 *
 * @date 2018-10-30
 * @export
 */
@Component({
  selector: 'sc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent extends Cleanable implements OnInit {

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

  /**
   * Emits any time the menu is closed from inside.
   *
   * @memberof MenuComponent
   */
  @Output() menuClosed: EventEmitter<void>;

  /**
   * Creates an instance of MenuComponent.
   * @date 2019-01-09
   * @param bpObserver Material's CDK breakpoint observer.
   * @param router Angular Router.
   * @memberof MenuComponent
   */
  constructor(private bpObserver: BreakpointObserver, private router: Router) {
    super();
    this.menuClosed = new EventEmitter();
  }

  /**
   * Component's onInit lifecycle, used to start device size breakpoint observer.
   *
   * @date 2019-01-09
   * @memberof MenuComponent
   */
  ngOnInit() {
    this.bpObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(value => value.matches),
        takeUntil(this.destroyed)) // do not use take(1) as multiple values are received.
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
   * Opens/closes the parent {@link MenuItem} if has any children.
   *
   * @date 2019-01-19
   * @param item to be opened/closed.
   * @memberof MenuComponent
   */
  public parentNodeToggled(item: MenuItem): void {
    if (item.hasChildren()) {
      item.toggleOpen();
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
    if (!Utils.isEmptyString(item.path)) { 
      this.router.navigate(Utils.getPathArray(item.path));

    }
  }

}
