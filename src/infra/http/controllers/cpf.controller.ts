import * as express from "express";
import { AddCPFUseCase } from "@app/use-cases/add-cpf/add-cpf.use-case";
import { DeleteCPFUseCase } from "@app/use-cases/delete-cpf/delete-cpf.use-case";
import { ListAllCPFsUseCase } from "@app/use-cases/list-all-cpfs/list-all-cpfs.use-case";
import { ListUniqueCPFUseCase } from "@app/use-cases/list-unique-cpf/list-unique-cpf.use-case";
import { BaseController } from "@core/infra/http/base-controller";
import { DomainErrors } from "@domain/errors/domain-errors";
import { ApplicationErrors } from "@app/errors/application-errors";
import { CreateCPFHttpRequest, ListUniqueCPFHttpRequest } from "../requests";
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
    this.listUnique = this.listUnique.bind(this);
    this.listAll = this.listAll.bind(this);
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

  public async listUnique(
    req: ListUniqueCPFHttpRequest,
    res: express.Response
  ): Promise<express.Response> {
    const { cpf } = req.params;

    const uniqueCpfOrError = await this.listUniqueCPFUseCase.execute({ cpf });

    if (uniqueCpfOrError.isLeft()) {
      const error = uniqueCpfOrError.result;

      switch (error.constructor) {
        case DomainErrors.InvalidCpfException:
          return this.unprocessableEntity(res, error);
        case ApplicationErrors.NotFoundCpfException:
          return this.notFound(res, error);
        default:
          return this.fail(res, error);
      }
    }

    const cpfDTO = uniqueCpfOrError.result;
    const cpfViewModel = CPFPresenter.toViewModel(cpfDTO);

    return this.ok(res, cpfViewModel);
  }

  public async listAll(_: express.Request, res: express.Response): Promise<express.Response> {
    const allCPFsOrError = await this.listAllCPFsUseCase.execute();

    if (allCPFsOrError.isLeft()) {
      return this.fail(res);
    }

    const cpfDTOs = allCPFsOrError.result;
    const cpfViewModelArray = CPFPresenter.bulkToViewModel(cpfDTOs);

    return this.ok(res, cpfViewModelArray);
  }

  //   public async delete(req, res: express.Response) {}
}
