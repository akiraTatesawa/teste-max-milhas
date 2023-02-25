interface ValueObjectProps {
  [value: string]: any;
}

/**
 * This abstraction represent a Domain Value Object.
 *
 * Every Value Object in this application must extends this class.
 * @class
 */
export abstract class ValueObject<Props extends ValueObjectProps> {
  protected readonly _props: Props;

  constructor(props: Props) {
    this._props = props;
  }
}
