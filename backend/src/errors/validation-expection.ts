import { ValidationError } from "class-validator";

export class ValidationExcpetion extends Error {
  name: string;
  message: string;
  errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super();
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationExcpetion.prototype);
  }
}
