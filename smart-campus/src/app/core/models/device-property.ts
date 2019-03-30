import { Property } from './property';
import { PropertyType } from './types';

export class DeviceProperty extends Property {

  public deviceId: number;

  constructor(name: string, type: PropertyType, value: string, deviceId: number) {
    super(name, type, value);
    this.deviceId = deviceId;
  }
}
