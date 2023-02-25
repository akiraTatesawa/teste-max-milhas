import { CPFRepository } from "@app/ports/cpf-repository";
import { AddCPFUseCase } from "@app/use-cases/add-cpf/add-cpf.use-case";
import { DeleteCPFUseCase } from "@app/use-cases/delete-cpf/delete-cpf.use-case";
import { ListAllCPFsUseCase } from "@app/use-cases/list-all-cpfs/list-all-cpfs.use-case";
import { ListUniqueCPFUseCase } from "@app/use-cases/list-unique-cpf/list-unique-cpf.use-case";
import { prisma } from "@infra/data/prisma/connection";
import { PrismaCPFRepository } from "@infra/data/prisma/repositories/prisma-cpf-repository";
import { CPFController } from "./cpf.controller";

function cpfControllerFactory(): CPFController {
  const cpfRepository: CPFRepository = new PrismaCPFRepository(prisma);

  const addCPFUseCase = new AddCPFUseCase(cpfRepository);
  const listUniqueCPFUseCase = new ListUniqueCPFUseCase(cpfRepository);
  const listAllCPFsUseCase = new ListAllCPFsUseCase(cpfRepository);
  const deleteCPFUseCase = new DeleteCPFUseCase(cpfRepository);

  return new CPFController(
    addCPFUseCase,
    listUniqueCPFUseCase,
    listAllCPFsUseCase,
    deleteCPFUseCase
  );
}

export const cpfController = cpfControllerFactory();
