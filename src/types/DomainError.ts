export enum TypeErrors{
  NotFound = "NotFound",
  InvalidInput = "InvalidInput",
  Unauthorized = "Unauthorized",
  InternalServerError = "InternalServerError",
 }
export class DomainError extends Error {
  public type: TypeErrors;
  constructor(message: string, type = TypeErrors.InternalServerError) {
    super(message);
    this.type = type;
  }
}