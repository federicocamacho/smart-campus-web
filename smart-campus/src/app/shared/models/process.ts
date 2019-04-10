import { Property } from './property';

export class Process {

  public id: number;
  public name: string;
  public description: string;
  public properties: Property[];

  constructor(id: number, name: string, description: string, properties: Property[] = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.properties = properties;
  }
}
