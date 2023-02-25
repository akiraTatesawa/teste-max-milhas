import { CPF } from "@domain/cpf/cpf.entity";
import { prisma } from "@infra/data/prisma/connection";
import { PrismaCPFRepository } from "@infra/data/prisma/repositories/prisma-cpf-repository";

export class CPFHelper {
  public static async insertCPF(cpf: string): Promise<void> {
    const cpfOrError = CPF.create(cpf);

    if (cpfOrError.isLeft()) {
      throw cpfOrError.result;
    }

    const prismaCPFRepo = new PrismaCPFRepository(prisma);

    await prismaCPFRepo.create(cpfOrError.result);
  }
}
