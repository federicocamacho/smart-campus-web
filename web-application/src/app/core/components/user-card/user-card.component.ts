import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sc-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input('accentColor') accentColor: string;
  @Input('email') email: string;
  @Input('imageUrl') imageUrl: string;
  @Input('name') name: string;
  @Input('username') username: string;

  @Output('profileClicked') profileClicked: EventEmitter<void>;
  @Output('logoutClicked') logoutClicked: EventEmitter<void>;

  constructor() {
    this.profileClicked = new EventEmitter();
    this.logoutClicked = new EventEmitter();
  }

  ngOnInit() {
  }

}
