import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title: string;

  constructor(public appService: AppService) {
    this.title = 'Smart Campus';
  }
}
