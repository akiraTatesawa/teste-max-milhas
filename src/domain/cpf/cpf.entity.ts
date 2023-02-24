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
