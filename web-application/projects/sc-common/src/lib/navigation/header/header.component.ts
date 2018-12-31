import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderItem } from './header-item';

/**
 * Customizable Navbar component.
 *
 * @date 2018-10-30
 * @export
 */
@Component({
  selector: 'sc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  /**
   * Navbar's background color as a string (receives HEX and color names).
   *
   * @memberof HeaderComponent
   */
  @Input() backgroundColor: string;
  
  /**
   * Color of the application's title (receives HEX and color names).
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
   * Item's displayed in the navbar, can be used to execute actions.
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
   * Indicates if the status of the side menu {@link MenuComponent }
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

  constructor(private router: Router) {
    this.menuToggled = new EventEmitter();
    this.userToggled = new EventEmitter();
  }

  /**
   * Go to application's home page using Angular Router
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
