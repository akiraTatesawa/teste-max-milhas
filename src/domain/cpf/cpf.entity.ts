import { Entity } from "@core/domain/entity";
import { Either, left, right } from "@core/logic/either";
import { DomainErrors } from "@domain/errors/domain-errors";
import { CPFValueObject } from "./cpf.vo";

interface CPFEntityProps {
  cpf: CPFValueObject;
  createdAt: Date;
}

interface CPFReconstituteProps {
  id: string;
  cpf: string;
  createdAt: Date;
}

/**
 * A Domain Entity that represents a CPF.
 *
 * This class cannot be directly instantiated.
 * Instead, use the static method `create(cpf)` or `reconstitute(cpf)`.
 *
 * @class
 * @prop {String} id
 * @prop {Date} createdAt
 * @prop {CPFValueObject} cpf
 */
export class CPF extends Entity<CPFEntityProps> {
  private constructor(props: CPFEntityProps, id?: string) {
    super(props, id);
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }

  public get cpf(): CPFValueObject {
    return this._props.cpf;
  }

  /**
   * This method should be used to create a CPF Entity from scratch.
   *
   * @method
   * @param {String} cpf
   * @returns {CPF}
   */
  public static create(cpf: string): Either<DomainErrors.InvalidCpfException, CPF> {
    const cpfValueObjectOrError = CPFValueObject.create(cpf);
    if (cpfValueObjectOrError.isLeft()) {
      return left(cpfValueObjectOrError.result);
    }

    const cpfVO: CPFValueObject = cpfValueObjectOrError.result;
    const cpfEntity: CPF = new CPF({
      cpf: cpfVO,
      createdAt: new Date(),
    });

    return right(cpfEntity);
  }

  /**
   * This method should be used to reconstitute a database CPF to a Domain CPF Entity.
   *
   * @method
   * @param {CPFReconstituteProps} props
   * @returns {CPF}
   */
  public static reconstitute(
    props: CPFReconstituteProps
  ): Either<DomainErrors.InvalidCpfException, CPF> {
    const { cpf, createdAt, id } = props;

    const cpfValueObjectOrError = CPFValueObject.create(cpf);
    if (cpfValueObjectOrError.isLeft()) {
      return left(cpfValueObjectOrError.result);
    }

    const cpfVO: CPFValueObject = cpfValueObjectOrError.result;
    const cpfEntity: CPF = new CPF(
      {
        cpf: cpfVO,
        createdAt,
      },
      id
    );

    return right(cpfEntity);
  }
}
