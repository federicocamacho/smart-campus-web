import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Gateway, Property } from 'src/app/core';

@Component({
  selector: 'sc-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {

  public displayedColumns: string[] = ['Tipo', 'Nombre', 'Descripción'];

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

}
