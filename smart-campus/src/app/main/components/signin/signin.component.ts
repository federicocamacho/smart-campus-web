import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { take, takeUntil } from 'rxjs/operators';

import { AppService } from '../../../app.service';
import { Subscribable } from '../../../shared/utils/subscribable';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'sc-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends Subscribable {

  public signin: User = new User();

  constructor(public appService: AppService, private userService: UserService) {
    super();
  }

  public doSignin(): void {
    this.appService.isBusy = true;
    this.userService.signin(this.signin)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (user: User) => this.appService.authenticate(user),
        (err: HttpErrorResponse) => this.appService.handleGenericError(err));
  }

}
