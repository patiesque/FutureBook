import { BaseError } from "./baseError";

export class MinimumCharacterError extends BaseError {
  constructor() {
    super(400, "A senha tem que ter no mínimo 6 caracteres");
  }
}
