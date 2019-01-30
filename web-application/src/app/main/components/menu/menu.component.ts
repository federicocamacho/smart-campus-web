import { 
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output 
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';

import { Cleanable } from 'src/app/core/utils/cleanable';
import { MenuTree } from 'src/app/core/models/menu-tree';
import { AppService } from 'src/app/app.service';


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
   * Indicates whether the menu is opened or not.
   *
   * @memberof MenuComponent
   */
  @Input() isOpened: boolean;

  /**
   * Indicates whether the device is a mobile or not.
   *
   * @memberof MenuComponent
   */
  public isMobile: boolean;

  /**
   * Items to be showed as options in the Side menu.
   *
   * @memberof MenuComponent
   */
  @Input() menu: MenuTree;

  /**
   * Emits any time the menu is closed from inside.
   *
   * @memberof MenuComponent
   */
  @Output() menuClosed: EventEmitter<void>;

  /**
   * Creates an instance of MenuComponent.
   * @date 2019-01-09
   * @param appService: Application's main service.
   * @param bpObserver Material's CDK breakpoint observer.
   * @memberof MenuComponent
   */
  constructor(
    private appService: AppService,
    private bpObserver: BreakpointObserver) {
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
      .observe([Breakpoints.XSmall])
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
    this.isMobile = isMobile;
  }

  /**
   * Trigerred when lazy loading is executed in the menu, retrieves the next page of 'Applications'.
   *
   * @date 2019-01-28
   * @memberof MenuComponent
   */
  public onLoadMore(): void {
    const pageToLoad = this.appService.lastMenuPageLoaded + 1;
    this.appService.populateMenu(this.appService.user.id, pageToLoad);
  }

}
