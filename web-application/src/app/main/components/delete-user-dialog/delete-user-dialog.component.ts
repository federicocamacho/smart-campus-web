import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/**
 * Material User Dialog for User Deletion.
 *
 * @date 2019-01-09
 * @export
 * @class DeleteUserDialogComponent
 */
@Component({
  selector: 'sc-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent {

  /**
   * Creates an instance of DeleteUserDialogComponent.
   * @date 2019-01-09
   * @param dialogRef reference to the dialog.
   * @param data to be passed to the dialog.
   * @memberof DeleteUserDialogComponent
   */
  constructor(public dialogRef: MatDialogRef<DeleteUserDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: { username: string }) { }

}
