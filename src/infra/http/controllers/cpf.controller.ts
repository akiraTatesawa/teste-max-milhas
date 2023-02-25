import * as express from "express";
import { AddCPFUseCase } from "@app/use-cases/add-cpf/add-cpf.use-case";
import { DeleteCPFUseCase } from "@app/use-cases/delete-cpf/delete-cpf.use-case";
import { ListAllCPFsUseCase } from "@app/use-cases/list-all-cpfs/list-all-cpfs.use-case";
import { ListUniqueCPFUseCase } from "@app/use-cases/list-unique-cpf/list-unique-cpf.use-case";
import { BaseController } from "@core/infra/http/base-controller";
import { DomainErrors } from "@domain/errors/domain-errors";
import { ApplicationErrors } from "@app/errors/application-errors";
import { CreateCPFHttpRequest } from "../requests";
import { CPFPresenter } from "../presenters/cpf.presenter";

export class CPFController extends BaseController {
  constructor(
    private readonly addCPFUseCase: AddCPFUseCase,
    private readonly listUniqueCPFUseCase: ListUniqueCPFUseCase,
    private readonly listAllCPFsUseCase: ListAllCPFsUseCase,
    private readonly deleteCPFUseCase: DeleteCPFUseCase
  ) {
    super();

    this.create = this.create.bind(this);
  }

  public async create(req: CreateCPFHttpRequest, res: express.Response): Promise<express.Response> {
    const { cpf } = req.body;

    const addCPFResultOrError = await this.addCPFUseCase.execute({ cpf });

    if (addCPFResultOrError.isLeft()) {
      const error = addCPFResultOrError.result;

      switch (error.constructor) {
        case DomainErrors.InvalidCpfException:
          return this.unprocessableEntity(res, error);
        case ApplicationErrors.ExistsCpfException:
          return this.conflict(res, error);
        default:
          return this.fail(res, error);
      }
    }

    const cpfDTO = addCPFResultOrError.result;
    const cpfViewModel = CPFPresenter.toViewModel(cpfDTO);

    return this.created(res, cpfViewModel);
  }

  //   public async listUnique(req, res: express.Response) {}

  //   public async listAll(req, res: express.Response) {}

  //   public async delete(req, res: express.Response) {}
}