import { BaseError } from "./baseError";

export class MinimumCharacterError extends BaseError {
  constructor() {
    super(400, "Minimum 6 characters");
  }
}
