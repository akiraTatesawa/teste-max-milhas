import { randomUUID } from "node:crypto";

/**
 * This abstraction represents a Domain Entity.
 *
 * Every Entity in this application must extend this class.
 * @class
 */
export abstract class Entity<Props> {
  public readonly id: string;

  protected readonly _props: Props;

  constructor(props: Props, id?: string) {
    this._props = props;
    this.id = id ?? randomUUID();
  }
}
