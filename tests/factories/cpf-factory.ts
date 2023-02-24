import { CPF } from "@domain/cpf/cpf.entity";

export class CPFFactory {
  public static generate(cpf: string): CPF {
    return CPF.create(cpf).result as CPF;
  }
}
