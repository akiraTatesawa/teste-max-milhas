import { CpfDTO } from "@app/dtos/cpf.dto";
import { CPFApplicationMapper } from "@app/mappers/cpf-mapper";
import { CPFRepository } from "@app/ports/cpf-repository";
import { UseCase } from "@core/app/use-case";
import { Either, right } from "@core/logic/either";
import { CPF } from "@domain/cpf/cpf.entity";

type ListAllCPFsOutput = Either<null, CpfDTO[]>;

export class ListAllCPFsUseCase extends UseCase<null, ListAllCPFsOutput> {
  private readonly _cpfRepository: CPFRepository;

  constructor(cpfRepository: CPFRepository) {
    super();
    this._cpfRepository = cpfRepository;
  }

  public async execute(): Promise<ListAllCPFsOutput> {
    const cpfEntities: CPF[] = await this._cpfRepository.findAll();

    const cpfDTOs: CpfDTO[] = CPFApplicationMapper.bulkToDTO(cpfEntities);

    return right(cpfDTOs);
  }
}
