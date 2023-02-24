import { randomUUID } from "node:crypto";

export abstract class Entity<Props> {
  public readonly id: string;

  protected readonly _props: Props;

  constructor(props: Props, id?: string) {
    this._props = props;
    this.id = id ?? randomUUID();
  }
}
