import { Component } from '@angular/core';

import { AppService } from './app.service';
import { Subscribable } from './shared/utils/subscribable';

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
export class AppComponent extends Subscribable {

  public title: string;

  constructor(public appService: AppService) {
    super();
    this.title = 'Smart Campus';
  }

}
