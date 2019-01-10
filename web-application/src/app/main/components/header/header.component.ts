import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderItem } from '../../../core';

/**
 * Customizable Navbar component.
 *
 * @date 2018-10-30
 * @export
 */
@Component({
  selector: 'sc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  /**
   * Navbar's background color as a string (receives HEX and color names).
   *
   * @memberof HeaderComponent
   */
  @Input() backgroundColor: string;
  
  /**
   * Application's title color (receives HEX and color names).
   *
   * @memberof HeaderComponent
   */
  @Input() brandLogoSrc: string;

  /**
   * Application's title, also considered as brand name.
   *
   * @memberof HeaderComponent
   */
  @Input() brandName: string;

  /**
   * Item's displayed in the navbar, used to execute actions.
   *
   * @memberof HeaderComponent
   */
  @Input() headerOptions: HeaderItem[];

  /**
   * Navbar icons' color (Material Design Icons) (receives HEX and color names).
   *
   * @memberof HeaderComponent
   */
  @Input() iconsColor: string;

  /**
   * Indicates the display status of the side menu {@link MenuComponent}
   *
   * @memberof HeaderComponent
   */
  @Input() isMenuOpened: boolean;

  /**
   * Navbar's text color (receives HEX and color names).
   *
   * @memberof HeaderComponent
   */
  @Input() textColor: string;

  /**
   * URL of the current's user profile picture.
   *
   * @memberof HeaderComponent
   */
  @Input() userImgSrc: string;

  /**
   * Name of the currently authenticated user.
   *
   * @memberof HeaderComponent
   */
  @Input() userName: string;

  /**
   * Emits an event every time the hamburger icon is pressed.
   *
   * @memberof HeaderComponent
   */
  @Output() menuToggled: EventEmitter<void>;

  /**
   * Emits and event every time the user space is pressed.
   *
   * @memberof HeaderComponent
   */
  @Output() userToggled: EventEmitter<MouseEvent>;

  /**
   * Creates an instance of HeaderComponent.
   * @date 2019-01-09
   * @param router Angular Router.
   * @memberof HeaderComponent
   */
  constructor(private router: Router) {
    this.menuToggled = new EventEmitter();
    this.userToggled = new EventEmitter();
  }

  /**
   * Navigate to application's home page.
   *
   * @date 2018-10-30
   * @memberof HeaderComponent
   */
  public goHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * Used to emit the {@link menuToggled } {@link EventEmitter } 
   *
   * @date 2018-10-30
   * @memberof HeaderComponent
   */
  public toggleMenu(): void {
    this.menuToggled.emit();
  }

  /**
   * Used to emit the {@link userToggled } {@link EventEmitter } 
   *
   * @date 2018-10-30
   * @param event: The Mouse event executed.
   * @memberof HeaderComponent
   */
  public toggleUser(event: MouseEvent): void {
    this.userToggled.emit(event);
  }

}
