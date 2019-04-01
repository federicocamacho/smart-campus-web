export class ApiResponse {

  public successful: boolean;
  public message: string;

  constructor(successful: boolean, message?: string) {
    this.successful = successful;
    this.message = message;
  }

}
