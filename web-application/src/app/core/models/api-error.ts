export class ApiError {
  public status: string;
  public statusCode: number;
  public timestamp: Date;
  public message: string;

  constructor(status?: string, statusCode?: number, timestamp?: Date, message?: string) {
    this.status = status;
    this.statusCode = statusCode;
    this.timestamp = timestamp;
    this.message = message;
  }
  
  public static ofGeneric(): ApiError {
    return new ApiError('INTERNAL_SERVER_ERROR', 505, new Date(), 'Un error ocurrió por favor intentelo más tarde.');
  }
}
