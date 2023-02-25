/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from "express";
import httpStatus from "http-status";

import { HttpError } from "@core/infra/http/http-error";
import { WinstonLogger } from "../logger/logger";

export class ErrorHandler {
  private static toHttpError(error: Error): HttpError {
    return {
      message: error.message,
      type: "InternalServerError",
    };
  }

  public static async handleExceptions(
    error: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) {
    const httpError = ErrorHandler.toHttpError(error);
    const logger = WinstonLogger.create();

    logger.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(httpError);
  }
}
