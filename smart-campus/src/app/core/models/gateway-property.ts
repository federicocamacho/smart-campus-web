import { Property } from './property';
import { PropertyType } from './types';

export class GatewayProperty extends Property {

  public gatewayId: number;

  constructor(name: string, type: PropertyType, value: string, gatewayId: number) {
    super(name, type, value);
    this.gatewayId = gatewayId;
  }
}
