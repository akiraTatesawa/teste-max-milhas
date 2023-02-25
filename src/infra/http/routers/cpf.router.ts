import { ExpressRouter } from "@core/infra/http/express-router";
import { cpfController } from "../controllers";

export class CPFRouter extends ExpressRouter {
  protected configRouter(): void {
    this.expressRouter.post("/", cpfController.create);
  }
}
