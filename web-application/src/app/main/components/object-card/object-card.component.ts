import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { Cleanable } from 'src/app/core';

/**
 * Represents the cards with the information about gateways, applications, devices, etc.
 * 
 * @Date 
 * @export
 * @class ObjectCardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'sc-object-card',
  templateUrl: './object-card.component.html',
  styleUrls: ['./object-card.component.scss']
})
export class ObjectCardComponent extends Cleanable implements OnInit  {

  /**
   * Indicates the image's path to be displayed in the card.
   *
   * @type {string}
   * @memberof ObjectCardComponent
   */
  @Input() imagePath: string;

  /**
   * Indicates the card's title.
   * For instance: Gateway 1.
   *
   * @type {string}
   * @memberof ObjectCardComponent
   */
  @Input() title: string;

  /**
   * The card's description.
   *
   * @type {string}
   * @memberof ObjectCardComponent
   */
  @Input() description: string;

  /**
   * Question that must appear on the deletion dialog body.
   *
   * @type {string}
   * @memberof ObjectCardComponent
   */
  @Input() dialogQuestion: string;

  /**
   * Title that must appear on the deletion dialog header.
   *
   * @type {string}
   * @memberof ObjectCardComponent
   */
  @Input() dialogTitle: string;

  /**
   * Emits when the user delete a card.
   *
   * @memberof ObjectCardComponent
   */
  @Output() delete = new EventEmitter<{}>();

  constructor(private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
  }

  /**
   * Opens a dialog to confirm the deletion.
   *
   * @memberof ObjectCardComponent
   */
  public onDelete(): void {
    const deleteDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title: this.dialogTitle,
              question: this.dialogQuestion}
    });

    deleteDialog.afterClosed()
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(result => result ? console.log('Affirmative response!') : null);
  }

}
