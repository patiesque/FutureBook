import { BaseError } from "./baseError";
export class InvalidParameterError extends BaseError {
  constructor(message: string) {
    super(401, message);
  }
}
