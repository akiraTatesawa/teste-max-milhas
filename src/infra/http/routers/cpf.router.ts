import { ExpressRouter } from "@core/infra/http/express-router";
import { cpfController } from "../controllers";
import { SchemaValidator } from "../middlewares/schema-validator.middleware";
import { CPFSchemas } from "../schemas/cpf.schemas";

export class CPFRouter extends ExpressRouter {
  protected configRouter(): void {
    // Create CPF
    this.expressRouter.post(
      "/",
      SchemaValidator.validateBody(CPFSchemas.createCpfSchema),
      cpfController.create
    );

    // List Unique CPF
    this.expressRouter.get("/:cpf", cpfController.listUnique);

    // List All CPFs
    this.expressRouter.get("/", cpfController.listAll);

    // Delete CPF
    this.expressRouter.delete("/:cpf", cpfController.delete);
  }
}
