export class Notification {

  public id: number;
  public gatewayId: number;
  public userId: number;
  public processId: number;
  public alive: boolean;
  public read: boolean;
  public timestamp: Date;
  public message: string;

  constructor(
    id: number,
    userId: number,
    gatewayId: number,
    processId: number,
    alive: boolean,
    read: boolean,
    timestamp: Date,
    message: string) {
      this.id = id;
      this.userId = userId;
      this.gatewayId = gatewayId;
      this.processId = processId;
      this.alive = alive;
      this.read = read;
      this.timestamp = timestamp;
      this.message = message;
    }
}
