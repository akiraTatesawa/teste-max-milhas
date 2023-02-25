import { ExpressRouter } from "@core/infra/http/express-router";
import { cpfController } from "../controllers";

export class CPFRouter extends ExpressRouter {
  protected configRouter(): void {
    // Create CPF
    this.expressRouter.post("/", cpfController.create);

    // List Unique CPF
    this.expressRouter.get("/:cpf", cpfController.listUnique);

    // List All CPFs
    this.expressRouter.get("/", cpfController.listAll);

    // Delete CPF
    this.expressRouter.delete("/:cpf", cpfController.delete);
  }
}
