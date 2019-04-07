import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { GatewaysFilter } from 'src/app/shared/models/types';
import { DataTable } from 'src/app/shared/utils/data-table';
import { Gateway } from 'src/app/shared/models/gateway';
import { MatTableDataSource } from '@angular/material';
import { Util } from 'src/app/shared/utils/util';

@Component({
  selector: 'sc-gateways-by-application',
  templateUrl: './gateways-by-application.component.html',
  styleUrls: ['./gateways-by-application.component.css']
})
export class GatewaysByApplicationComponent extends DataTable<Gateway, GatewaysFilter> implements OnInit, OnChanges {

  @Input() gateways: Gateway[];
  @Input() applicationId: number;

  constructor() {
    super(null, null);
    this.displayedColumns = [ 'name', 'description', 'ip', 'alive', 'actions' ];
  }

  ngOnInit() {
    super.initDataTable();
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.gateways);
  }

  protected filterPredicate: (data: Gateway, filter: string) => boolean = (data: Gateway, filter: string) => {
    switch (this.filterType) {
      case 'NAME': return Util.stringContains(data.name, filter);
      case 'DESCRIPTION': return Util.stringContains(data.description, filter);
      case 'IP': return Util.stringContains(data.ip, filter);
      case 'IS_ALIVE': return data.alive === (filter === 'true');
      default: return true;
    }
  }

}
