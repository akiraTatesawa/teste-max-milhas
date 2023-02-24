import { CpfDTO } from "@app/dtos/cpf.dto";
import { ListUniqueCpfDTO } from "@app/dtos/list-cpf.dto";
import { ApplicationErrors } from "@app/errors/application-errors";
import { CPFApplicationMapper } from "@app/mappers/cpf-mapper";
import { CPFRepository } from "@app/ports/cpf-repository";
import { UseCase } from "@core/app/use-case";
import { Either, left, right } from "@core/logic/either";
import { CPF } from "@domain/cpf/cpf.entity";
import { CPFValueObject } from "@domain/cpf/cpf.vo";
import { DomainErrors } from "@domain/errors/domain-errors";

type ListUniqueCPFOutput = Either<
  DomainErrors.InvalidCpfException | ApplicationErrors.NotFoundCpfException,
  CpfDTO
>;

export class ListUniqueCPFUseCase extends UseCase<ListUniqueCpfDTO, ListUniqueCPFOutput> {
  private readonly _cpfRepository: CPFRepository;

  constructor(cpfRepository: CPFRepository) {
    super();
    this._cpfRepository = cpfRepository;
  }

  public async execute({ cpf }: ListUniqueCpfDTO): Promise<ListUniqueCPFOutput> {
    const cpfValueObjectOrError = CPFValueObject.create(cpf);
    if (cpfValueObjectOrError.isLeft()) {
      return left(cpfValueObjectOrError.result);
    }

    const cpfEntityOrNull = await this._cpfRepository.findByCPF(cpf);
    if (!cpfEntityOrNull) {
      return left(new ApplicationErrors.NotFoundCpfException());
    }

    const cpfEntity: CPF = cpfEntityOrNull;
    const cpfDTO = CPFApplicationMapper.toDTO(cpfEntity);

    return right(cpfDTO);
  }
}
