import { CPF } from "@domain/cpf/cpf.entity";
import { PrismaCPF } from "@prisma/client";

export class PrismaCPFDataMapper {
  public static toDomain(raw: PrismaCPF): CPF {
    const cpfOrError = CPF.reconstitute({
      id: raw.id,
      cpf: raw.cpf,
      createdAt: raw.createdAt,
    });

    if (cpfOrError.isLeft()) {
      throw Error(cpfOrError.result.message);
    }

    return cpfOrError.result satisfies CPF;
  }

  public static bulkToDomain(persistenceArray: PrismaCPF[]): CPF[] {
    return persistenceArray.map((raw) => PrismaCPFDataMapper.toDomain(raw));
  }
}
