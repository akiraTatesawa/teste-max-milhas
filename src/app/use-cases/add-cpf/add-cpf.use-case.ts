import { AddCpfDTO } from "@app/dtos/add-cpf.dto";
import { CpfDTO } from "@app/dtos/cpf.dto";
import { ApplicationErrors } from "@app/errors/application-errors";
import { CPFApplicationMapper } from "@app/mappers/cpf-mapper";
import { CPFRepository } from "@app/ports/cpf-repository";
import { UseCase } from "@core/app/use-case";
import { Either, left, right } from "@core/logic/either";
import { CPF } from "@domain/cpf/cpf.entity";
import { DomainErrors } from "@domain/errors/domain-errors";

export type AddCpfUseCaseOutput = Either<DomainErrors.InvalidCpfException, CpfDTO>;

type EnsureCPFIsUniqueOutput = Either<ApplicationErrors.ExistsCpfException, null>;

export class AddCPFUseCase extends UseCase<AddCpfDTO, AddCpfUseCaseOutput> {
  private readonly _cpfRepository: CPFRepository;

  constructor(cpfRepository: CPFRepository) {
    super();
    this._cpfRepository = cpfRepository;
  }

  private async ensureIsUnique(cpf: string): Promise<EnsureCPFIsUniqueOutput> {
    const existingCPF = await this._cpfRepository.findByCPF(cpf);

    if (existingCPF) {
      return left(new ApplicationErrors.ExistsCpfException());
    }
    return right(null);
  }

  public async execute(input: AddCpfDTO): Promise<AddCpfUseCaseOutput> {
    const { cpf } = input;

    const isUniqueOrError = await this.ensureIsUnique(cpf);
    if (isUniqueOrError.isLeft()) {
      return left(isUniqueOrError.result);
    }

    const cpfEntityOrError = CPF.create(cpf);
    if (cpfEntityOrError.isLeft()) {
      return left(cpfEntityOrError.result);
    }

    const cpfEntity = cpfEntityOrError.result;

    await this._cpfRepository.create(cpfEntity);

    const cpfDTO = CPFApplicationMapper.toDTO(cpfEntity);

    return right(cpfDTO);
  }
}
