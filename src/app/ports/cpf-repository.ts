import { CPF } from "@domain/cpf/cpf.entity";

export interface CPFRepository {
  create(cpfModel: CPF): Promise<void>;
  delete(cpf: string): Promise<void>;
  findByCPF(cpf: string): Promise<null | CPF>;
  findAll(): Promise<CPF[]>;
}
