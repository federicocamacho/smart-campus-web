import { AppService } from './app.service';
import { Component } from '@angular/core';

/**
 * Main component used to bootstrap the application.
 *
 * @date 2019-04-09
 * @export
 */
@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title: string;

  constructor(public appService: AppService) {
    this.title = 'Smart Campus';
  }
}
