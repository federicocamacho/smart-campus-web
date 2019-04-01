import { HttpErrorResponse } from '@angular/common/http';

export class ApiError {

  public timestamp: Date;
  public message: string;
  public exception: string;
  public status: string;

  constructor(status?: string, message?: string, timestamp?: Date, exception?: string) {
    this.status = status;
    this.message = message;
    this.timestamp = timestamp;
    this.exception = exception;
  }

  public static fromClientError(error: Error): ApiError {
      return new ApiError('CLIENT_ERROR', error.message, new Date(), 'ClientError');
  }

  public static fromGeneric(error: HttpErrorResponse): ApiError {
    return new ApiError('INTERNAL_ERROR', error.message, new Date(), 'InternalError');
  }

  public static fromTimeout(error: ProgressEvent): ApiError {
    return new ApiError('INTERNAL_ERROR', 'El servidor no se encuentra disponible.', new Date(error.timeStamp), 'TimeoutEror');
  }

}
