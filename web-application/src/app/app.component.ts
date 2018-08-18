import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/auth/authentication.service';

/**
 * Application's main Component
 *
 * @date 2018-06-28
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  /**
   * Represents if the user is loged or not. Is used to hide and show dashboard elements in login page.
   *
   * @type {boolean}
   * @memberof AppComponent
   */
  public isLogin: boolean;

  /**
   * Binded to side bar menu display.
   *
   * @type {boolean}
   * @memberof HomeComponent
   */
  public isMenuOpened: boolean;

  /**
   * Application Title
   *
   * @type {string}
   * @memberof AppComponent
   */
  public title: string;

  /**
   * Creates an instance of AppComponent.
   * @date 2018-07-07
   * @memberof AppComponent
   */
  constructor(private auth: AuthenticationService) {
    this.isMenuOpened = true;
    this.title = 'Smart Campus';
  }

  /**
   *Ng on init
   *
   * @memberof AppComponent
   */
  ngOnInit(): void {
    if (this.auth.isAuthenticated()) { this.isLogin = true; }
  }

  /**
   *Method fired when Navbar button is clicked.
   *
   * @author Federico Camacho
   * @date 2018-06-30
   * @memberof HomeComponent
   */
  public toggleSideMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
