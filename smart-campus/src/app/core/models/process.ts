import { ProcessProperty } from './process-property';

export class Process {

  public id: number;
  public name: string;
  public description: string;
  public properties: ProcessProperty[];

  constructor(id: number, name: string, description: string, properties: ProcessProperty[] = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.properties = properties;
  }
}
