import { ThingType } from './types';
import { DeviceProperty } from './device-property';

export class Device {

  public id: number;
  public name: string;
  public description: string;
  public type: ThingType;
  public gatewayId: number;
  public properties: DeviceProperty[];

  constructor(id: number, name: string, description: string, type: ThingType, gatewayId: number, properties: DeviceProperty[] = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.gatewayId = gatewayId;
    this.properties = properties;
  }

}
