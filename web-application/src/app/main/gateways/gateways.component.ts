import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Gateway } from '../../core/models/gateway';

@Component({
  selector: 'sc-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.scss']
})
export class GatewaysComponent implements OnInit {

  public gateways: Gateway[];

  constructor(private router: Router) {
    this.gateways = [
      new Gateway('gateway1', 'Gateway 1', 'Description of the use case', 'serveo.net1'),
      new Gateway('gateway2', 'gateway 2', 'Description of the use case', 'serveo.net1'),
      new Gateway('gateway3', 'gateway 3', 'Description of the use case', 'serveo.net1'),
      new Gateway('gateway4', 'gateway 4', 'Description of the use case', 'serveo.net1')
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
    this.router.navigate(['/config', 'gateway', this.gateways[index].id]);
  }

  /**
   * Opens the view to create a gateway.
   *
   * @memberof GatewayComponent
   */
  public createGateway(): void {
    this.router.navigate(['/config', 'gateway', 0]);
  }

}
