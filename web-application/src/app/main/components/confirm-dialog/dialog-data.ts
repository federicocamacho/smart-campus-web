/**
 * Confirm Dialog data object.
 *
 * @date 2019-01-19
 * @export
 * @class DialogData
 */
export class DialogData {

  /**
   * Dialog title.
   *
   * @memberof DialogData
   */
  public title: string;

  /**
   * Dialog question (description).
   *
   * @memberof DialogData
   */
  public question: string;

  /**
   * Object key. Used for further operations.
   *
   * @memberof DialogData
   */
  public key: any;

  /**
   * Creates an instance of DialogData.
   * @date 2019-01-19
   * @param title of the dialog.
   * @param question of the dialog.
   * @param [key] of the object owner of the dialog.
   * @memberof DialogData
   */
  constructor(title: string, question: string, key?: any) {
    this.title = title;
    this.question = question,
    this.key = key;
  }
  
}
