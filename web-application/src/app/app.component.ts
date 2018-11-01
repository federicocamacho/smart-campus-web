import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services';
import { AppService } from './app.service';

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
  public isLogin: boolean;
  public title: string;

  constructor(private auth: AuthService, public service: AppService) {
    this.title = 'Smart Campus';
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) { this.isLogin = true; }
  }
}

