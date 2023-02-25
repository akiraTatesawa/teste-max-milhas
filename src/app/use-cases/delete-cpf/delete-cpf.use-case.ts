import { DeleteCpfDTO } from "@app/dtos/delete-cpf.dto";
import { ApplicationErrors } from "@app/errors/application-errors";
import { CPFRepository } from "@app/ports/cpf-repository";
import { UseCase } from "@core/app/use-case";
import { Either, left, right } from "@core/logic/either";
import { CPFValueObject } from "@domain/cpf/cpf.vo";
import { DomainErrors } from "@domain/errors/domain-errors";

type DeleteCPFOutput = Either<
  DomainErrors.InvalidCpfException | ApplicationErrors.NotFoundCpfException,
  null
>;

export class DeleteCPFUseCase extends UseCase<DeleteCpfDTO, DeleteCPFOutput> {
  private readonly _cpfRepository: CPFRepository;

  constructor(cpfRepository: CPFRepository) {
    super();
    this._cpfRepository = cpfRepository;
  }

  public async execute({ cpf }: DeleteCpfDTO): Promise<DeleteCPFOutput> {
    const cpfValueObjectOrError = CPFValueObject.create(cpf);
    if (cpfValueObjectOrError.isLeft()) {
      return left(cpfValueObjectOrError.result);
    }

    const cpfEntityOrNull = await this._cpfRepository.findByCPF(cpf);
    if (!cpfEntityOrNull) {
      return left(new ApplicationErrors.NotFoundCpfException());
    }

    await this._cpfRepository.delete(cpf);

    return right(null);
  }
}
