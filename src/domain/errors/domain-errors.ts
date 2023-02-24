import { BaseError } from "@core/logic/base-error";

export namespace DomainErrors {
  /**
   * This error should be use when the CPF format is invalid or when the CPF
   * is not a valid value.
   *
   * @class
   * @extends BaseError
   */
  export class InvalidCpfException extends BaseError {
    constructor(message: string) {
      super(message, "InvalidCpfException");
    }
  }
}
