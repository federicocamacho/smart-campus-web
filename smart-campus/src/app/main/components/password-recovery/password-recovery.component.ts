import { Component } from '@angular/core';
import { Subscribable } from 'src/app/shared/utils/subscribable';
import { AppService } from 'src/app/app.service';
import { UserService } from 'src/app/core/services/user.service';
import { take, takeUntil } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'sc-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent extends Subscribable {

  public email: string;

  constructor(public appService: AppService, private userService: UserService) {
    super();
  }

  public doRetrievePassword(): void {
    this.appService.isBusy = true;
    this.userService.recoverPassword(this.email)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (response: ApiResponse) => this.handleRetrievePassResponse(response),
        (err: HttpErrorResponse) => this.appService.handleGenericError(err));
  }

  private handleRetrievePassResponse(res: ApiResponse): void {
    this.appService.showSnack(res.message);
    this.appService.isBusy = false;
  }

}
