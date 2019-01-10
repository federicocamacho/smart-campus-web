import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sc-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  /**
   * User's email.
   *
   * @memberof UserCardComponent
   */
  @Input('email') email: string;

  /**
   * User's image url.
   *
   * @memberof UserCardComponent
   */
  @Input('imageUrl') imageUrl: string;

  /**
   * User's name.
   *
   * @memberof UserCardComponent
   */
  @Input('name') name: string;

  /**
   * User's username.
   *
   * @memberof UserCardComponent
   */
  @Input('username') username: string;

  /**
   * Event emitter that emit's when the see profile option is clicked.
   *
   * @memberof UserCardComponent
   */
  @Output('profileClicked') profileClicked: EventEmitter<void>;

  /**
   * Event emitter that emit's when the 'delete profile' option is clicked.
   *
   * @memberof UserCardComponent
   */
  @Output('deleteClicked') deleteClicked: EventEmitter<void>;

  /**
   * Event emitter that emit's when the user logs out.
   *
   * @memberof UserCardComponent
   */
  @Output('logoutClicked') logoutClicked: EventEmitter<void>;

  /**
   * Creates an instance of UserCardComponent.
   * @date 2019-01-09
   * @memberof UserCardComponent
   */
  constructor() {
    this.profileClicked = new EventEmitter();
    this.logoutClicked = new EventEmitter();
    this.deleteClicked = new EventEmitter();
  }

  /**
   * Event handler for Profile option selection.
   *
   * @date 2018-12-31
   * @memberof UserCardComponent
   */
  public onProfileClicked(): void {
    this.profileClicked.emit();
  }

  /**
   * Event handler for Delete Profile option selection.
   *
   * @date 2018-12-31
   * @memberof UserCardComponent
   */
  public onDeleteClicked(): void {
    this.deleteClicked.emit();
  }

  /**
   * Event handler for Logout option selection.
   *
   * @date 2018-12-31
   * @memberof UserCardComponent
   */
  public onLogoutClicked(): void {
    this.logoutClicked.emit();
  }

}
