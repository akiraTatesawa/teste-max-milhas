import { CPF } from "@domain/cpf/cpf.entity";

export interface CPFRepository {
  create(cpfModel: CPF): Promise<void>;
  findByCPF(cpf: string): Promise<null | CPF>;
}
