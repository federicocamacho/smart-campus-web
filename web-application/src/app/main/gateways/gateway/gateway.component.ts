import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { AppService } from '../../../../app/app.service';
import { Property } from '../../../core/models/property';
import { Gateway } from '../../../core/models/gateway';

@Component({
  selector: 'sc-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {

  public displayedColumns: string[] = ['type', 'name', 'description', 'action'];

  public dataSource: MatTableDataSource<Property>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * The gateway object to be created or updated.
   *
   * @type {Gateway}
   * @memberof GatewayComponent
   */
  public gateway: Gateway;

  constructor(public appService: AppService) { 
    this.gateway = new Gateway('', 'Gateway 1', 'Descripción del primer gateway', 'edgeuis.iot', 
    [new Property('ubicacion', 'uis', 'CONFIG'),
    new Property('topic', 'gateway1')]);
    this.dataSource = new MatTableDataSource(this.gateway.properties);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  public createProperty(): void {
    this.gateway.properties.push(new Property('', '', 'CONFIG'));
    this.dataSource = new MatTableDataSource(this.gateway.properties);
    this.dataSource.paginator = this.paginator;
    setTimeout(() => this.dataSource.paginator.lastPage());
  }

  public deleteProperty(index: number): void {
    this.gateway.properties.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.gateway.properties);
    this.dataSource.paginator = this.paginator;
    if (this.gateway.properties.length % this.dataSource.paginator.pageSize === 0) {
      this.dataSource.paginator.previousPage();
    }
  }
}
