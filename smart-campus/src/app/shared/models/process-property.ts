import { Property } from './property';
import { PropertyType } from './types';

export class ProcessProperty extends Property {

  public processId: number;

  constructor(name: string, type: PropertyType, value: string, processId: number) {
    super(name, type, value);
    this.processId = processId;
  }

}
