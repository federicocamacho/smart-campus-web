import { Property } from './property';

export class Process {

  public id: number;
  public name: string;
  public description: string;
  public gatewayId: number;
  public alive: boolean;
  public properties: Property[];

  constructor(id: number, name: string, description: string, gatewayId: number, alive: boolean, properties: Property[] = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.alive = alive;
    this.properties = properties;
  }
}
