import "dotenv/config";
import * as express from "express";
import "express-async-errors";
import cors from "cors";

import { Application } from "@core/infra/http/application";
import { ServerRouter } from "./routers/server.router";

export class ExpressApp extends Application {
  private readonly _name: string;

  private readonly _app: express.Application;

  private readonly _serverRouter: express.Router;

  constructor() {
    super();
    this._name = `MAX-MILHAS-API-${process.env.NODE_ENV}`;
    this._serverRouter = new ServerRouter().expressRouter;
    this._app = express.default();

    this.configMiddlewares();
  }

  public get app(): express.Application {
    return this._app;
  }

  protected configMiddlewares(): void {
    this._app.use(cors());
    this._app.use(express.json());

    this._app.use(this._serverRouter);
  }

  public async init(): Promise<void> {
    const { PORT } = process.env;

    this._app.listen(PORT || 5000, () => {
      console.log(`[${this._name}] running on [PORT::${PORT}]`);
    });
  }
}
