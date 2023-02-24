/**
 * Represents the base error format. Every error in this application must extends this class.
 * @class
 * @extends Error
 *
 * @property {string} type
 * @property {string} message
 */
export abstract class BaseError extends Error {
  public readonly type: string;

  /**
   * @constructor
   * @param {string} message
   * @param {string} type
   */
  constructor(message: string, type: string) {
    super(message);
    this.type = type;
  }
}
