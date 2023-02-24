/* eslint-disable max-classes-per-file */

import { BaseError } from "@core/logic/base-error";

export namespace ApplicationErrors {
  /**
   * This error should be used when the CPF is already registered in the shortlist
   *
   * @class
   * @extends BaseError
   */
  export class ExistsCpfException extends BaseError {
    constructor() {
      super("CPF is already in the shortlist", "ExistsCpfException");
    }
  }

  /**
   * This error should be used when the CPF cannot be found
   *
   * @class
   * @extends BaseError
   */
  export class NotFoundCpfException extends BaseError {
    constructor() {
      super("CPF not found", "NotFoundCpfException");
    }
  }
}
