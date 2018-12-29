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
}

