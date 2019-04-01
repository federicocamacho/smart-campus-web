import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntil, take } from 'rxjs/operators';

import { AppService } from '../../../app.service';
import { Subscribable } from '../../../shared/utils/subscribable';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends Subscribable {

  public login: User = new User();

  constructor(public appService: AppService, public userService: UserService) {
    super();
  }

  public doLogin(): void {
    this.appService.isBusy = true;
    this.userService.login(this.login)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (user: User) => this.appService.authenticate(user),
        (err: HttpErrorResponse) => this.appService.handleGenericError(err));
  }

}
