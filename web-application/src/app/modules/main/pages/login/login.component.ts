import { Component, OnInit } from '@angular/core';
import { LoginOptions } from '../../../../shared/enums';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public loginMode: LoginOptions;

  constructor() {
    this.username = '';
    this.password = '';
    this.loginMode = LoginOptions.LOGIN;
  }

  ngOnInit() {}

}
