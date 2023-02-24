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
}
