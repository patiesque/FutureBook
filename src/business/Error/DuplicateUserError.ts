import { BaseError } from "./baseError";

export class DuplicateUserError extends BaseError {
    constructor() {
        super(1062, "Duplicate user")

    }
}