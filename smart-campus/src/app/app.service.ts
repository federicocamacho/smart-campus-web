import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { NgModel, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiError } from './shared/models/api-error';
import { User } from './shared/models/user';
import { Util } from './shared/utils/util';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public user: User;

  public isBusy: boolean;

  constructor(private router: Router, private snackBar: MatSnackBar) {
    this.isBusy = false;
  }

  public isUserAuthenticated(): boolean {
    if (this.user) {
      return true;
    }
    try {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      return this.user !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * Determines if the given form (NgForm) is invalid or not.
   *
   * @date 2019-01-10
   * @param form - {@link NgForm} to be evaluated.
   * @returns true if the form is invalid, false otherwise.
   */
  public isFormInvalid(form: NgForm): boolean {
    return form.form.invalid;
  }

  /**
   * Determines if the given model (NgModel) is invalid or not.
   *
   * @date 2019-01-10
   * @param model - {@link NgModel} to be evaluated.
   * @returns true if the model is invalid, false otherwise.
   */
  public isModelInvalid(model: NgModel): boolean {
    return model.invalid && (model.dirty || model.touched);
  }

  public handleGenericError(err: HttpErrorResponse, showError: boolean = true): void {
    let error: ApiError;
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      error = ApiError.fromClientError(err.error);
    } else if (err.error instanceof ProgressEvent) {
      // Timeout error
      error = ApiError.fromTimeout(err.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      try {
        error = err.error as ApiError;
      } catch (err) {
        error = ApiError.fromGeneric(err);
      }
    }
    console.log(error);
    this.isBusy = false;

    if (showError) {
      this.showSnack(error.message);
    }
  }

  public authenticate(user: User): void {
    this.user = user;
    sessionStorage.clear();
    sessionStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/dashboard']);
  }

  public showSnack(message: string, action: string = 'OK', config: MatSnackBarConfig = Util.snackOptions()): void {
    this.snackBar.dismiss();
    this.snackBar.open(message, action, config);
  }

}
