import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

/**
 * User profile component. Path /profile.
 *
 * @date 2018-12-31
 * @export
 * @class ProfileComponent
 */
@Component({
  selector: 'sc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public username: string;

  constructor(private service: AppService) {
    this.username = '@' + service.user.username;
  }

}
