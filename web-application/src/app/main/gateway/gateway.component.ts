import { Component, OnInit } from '@angular/core';
import { Gateway } from '../../core/index';

@Component({
  selector: 'sc-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {

  public gateways: Gateway[];

  constructor() {
    this.gateways = [
      new Gateway('sdad', 'Gateway 1', 'Description of the use case', 'serveo.net1'),
      new Gateway('sdad', 'gateway 2', 'Description of the use case', 'serveo.net1'),
      new Gateway('sdad', 'gateway 3', 'Description of the use case', 'serveo.net1'),
      new Gateway('sdad', 'gateway 4', 'Description of the use case', 'serveo.net1')
    ];
  }

  ngOnInit() {

  }

  /**
   * Deletes a gateway by its position.
   *
   * @param {number} index - position in the list of gateways.
   * @memberof GatewayComponent
   */
  public deleteGateway(index: number): void {
    this.gateways.splice(index, 1);
  }

  /**
   * Opens the view to update gateway's properties.
   *
   * @param {number} index - position in the list of gateways.
   * @memberof GatewayComponent
   */
  public updateGateway(index: number): void {
    console.log(this.gateways[index].name);
  }

  /**
   * Opens the view to create a gateway.
   *
   * @memberof GatewayComponent
   */
  public createGateway(): void {
    console.log('Crear gateway');
  }

}
