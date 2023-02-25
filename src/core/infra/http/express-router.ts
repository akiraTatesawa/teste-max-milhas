import * as express from "express";

/**
 * This abstract class represents a http router.
 *
 * Every router in this application must extend this class and implement
 * its abstracts methods.
 *
 * @class
 * @property {express.Router} expressRouter
 */
export abstract class ExpressRouter {
  public readonly expressRouter: express.Router;

  constructor() {
    this.expressRouter = express.Router();

    this.configRouter();
  }

  protected abstract configRouter(): void;
}
