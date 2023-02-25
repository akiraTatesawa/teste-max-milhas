import { CpfDTO } from "@app/dtos/cpf.dto";
import { CPF } from "@domain/cpf/cpf.entity";

export class CPFApplicationMapper {
  public static toDTO(domainCPF: CPF): CpfDTO {
    return {
      id: domainCPF.id,
      cpf: domainCPF.cpf.value,
      createdAt: domainCPF.createdAt,
    };
  }

  public static bulkToDTO(domainCPFs: CPF[]): CpfDTO[] {
    return domainCPFs.map((domain) => CPFApplicationMapper.toDTO(domain));
  }
}
