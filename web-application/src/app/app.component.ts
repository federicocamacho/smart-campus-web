import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services';
import { AppService } from './app.service';
import { ToastyConfig } from 'ng2-toasty';

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
  
  public title: string;

  constructor(private auth: AuthService, 
              public service: AppService,
              private toastyConfig: ToastyConfig) {
    this.title = 'Smart Campus';
    this.toastyConfig.theme = 'material';
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) { this.service.isLogedIn = true; }
  }

  /**
   * Triggers a change in the side menu's visibility.
   *
   * @date 2018-10-31
   * @memberof AppService
   */
  public toggleSideMenu(): void {
    this.service.isMenuOpened = !this.service.isMenuOpened;
  }

  /**
   * Triggers a change in the user profile card's visibility.
   *
   * @date 2018-10-31
   * @param event that was executed.
   * @memberof AppService
   */
  public toggleUserCard(event: Event): void {
    this.service.isUserCardOpened = !this.service.isUserCardOpened;
    event.stopPropagation();
  }
  
  /**
   * Hides the side menu.
   *
   * @date 2018-10-31
   * @memberof AppService
   */
  public closeMenu(): void {
    this.service.isMenuOpened = false;
  }

  /**
   * Closes the user card component when a click was done in any other component.
   *
   * @date 2018-12-31
   * @param event that was executed.
   * @memberof AppComponent
   */
  public closeUserCard(event: Event): void {
    if (this.service.isUserCardOpened) {
      this.service.isUserCardOpened = false; 
    }
  }

}

