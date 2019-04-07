import { Component, OnInit, Input } from '@angular/core';

import { GatewaysFilter } from 'src/app/shared/models/types';
import { DataTable } from 'src/app/shared/utils/data-table';
import { Gateway } from 'src/app/shared/models/gateway';

@Component({
  selector: 'sc-gateways-by-application',
  templateUrl: './gateways-by-application.component.html',
  styleUrls: ['./gateways-by-application.component.css']
})
export class GatewaysByApplicationComponent extends DataTable<Gateway, GatewaysFilter> implements OnInit {

  @Input() gateways: Gateway[];

  constructor() {
    super(null, null);
    this.displayedColumns = [ 'name', 'description', 'ip', 'alive', 'actions' ];
  }

  protected filterPredicate: (data: Gateway, filter: string) => boolean = (data: Gateway, filter: string) => {
    return true;
  }

}
