import { NgForm, NgModel } from '@angular/forms';

import { Cleanable } from './cleanable';

/**
 * Utility class to handle ng forms.
 *
 * @date 2019-01-13
 * @export
 * @class FormHandler
 */
export class FormHandler extends Cleanable {
  
  /**
   * Determines if the given form (NgForm) is invalid or not.
   *
   * @date 2019-01-10
   * @param form {@link NgForm} to be evaluated.
   * @returns true if the form is invalid, false otherwise.
   * @memberof LoginComponent
   */
  public isFormInvalid(form: NgForm): boolean {
    return form.form.invalid && (form.form.dirty || form.form.touched)
  }

  /**
   * Determines if the given model (NgModel) is invalid or not.
   *
   * @date 2019-01-10
   * @param model {@link NgModel} to be evaluated.
   * @returns true if the model is invalid, false otherwise.
   * @memberof LoginComponent
   */
  public isModelInvalid(model: NgModel): boolean {
    return model.invalid && (model.dirty || model.touched);
  }

}
