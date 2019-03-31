import { Component, OnInit } from '@angular/core';
import { AuthType } from 'src/app/core/models/types';

@Component({
  selector: 'sc-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  public authType: AuthType;

  constructor() { }

  ngOnInit() {
  }

}
