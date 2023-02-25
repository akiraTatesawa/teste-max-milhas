import { ExpressRouter } from "@core/infra/http/express-router";
import { CPFRouter } from "./cpf.router";

export class ServerRouter extends ExpressRouter {
  protected configRouter(): void {
    const cpfRouter = new CPFRouter();

    this.expressRouter.use("/cpf", cpfRouter.expressRouter);
  }
}
