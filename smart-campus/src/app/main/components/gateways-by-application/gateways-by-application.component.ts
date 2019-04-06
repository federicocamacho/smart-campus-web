import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sc-gateways-by-application',
  templateUrl: './gateways-by-application.component.html',
  styleUrls: ['./gateways-by-application.component.css']
})
export class GatewaysByApplicationComponent implements OnInit {

  public displayedColumns = [ 'name', 'description', 'ip', 'alive', 'actions' ];

  constructor() { }

  ngOnInit() {
  }

}
