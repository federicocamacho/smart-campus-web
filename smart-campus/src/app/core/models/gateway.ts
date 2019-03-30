import { GatewayProperty } from './gateway-property';
import { Device } from './device';
import { Process } from './process';

export class Gateway {

  public id: number;
  public name: string;
  public description: string;
  public ip: string;
  public properties: GatewayProperty[];
  public devices: Device[];
  public processes: Process[];
  public applicationId: number;
  public alive: boolean;

  constructor(
    id: number,
    name: string,
    description: string,
    ip: string,
    applicationId: number,
    alive: boolean,
    properties: GatewayProperty[] = [],
    devices: Device[] = [],
    processes: Process[] = []) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.ip = ip;
      this.applicationId = applicationId;
      this.alive = alive;
      this.properties = properties;
      this.devices = devices;
      this.processes = processes;
    }

}
