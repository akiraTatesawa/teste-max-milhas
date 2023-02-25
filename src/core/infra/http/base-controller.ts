import * as express from "express";
import httpStatus from "http-status";

import { BaseError } from "@core/logic/base-error";
import { HttpError } from "./http-error";

/**
 * This abstract class provides methods to handle http responses.
 *
 * Every controller in this application must extends this class.
 * @class
 */
export abstract class BaseController {
  private toHttpError(error: BaseError): HttpError {
    return {
      type: error.type,
      message: error.message,
    };
  }

  protected ok<DTO>(res: express.Response, dto?: DTO): express.Response {
    if (!dto) {
      return res.status(httpStatus.OK);
    }
    return res.status(httpStatus.OK).json(dto);
  }

  protected created<DTO>(res: express.Response, dto?: DTO): express.Response {
    if (!dto) {
      return res.status(httpStatus.CREATED);
    }
    return res.status(httpStatus.CREATED).json(dto);
  }

  protected badRequest(res: express.Response, error: BaseError): express.Response {
    return res.status(httpStatus.BAD_REQUEST).json(this.toHttpError(error));
  }

  protected notFound(res: express.Response, error: BaseError): express.Response {
    return res.status(httpStatus.NOT_FOUND).json(this.toHttpError(error));
  }

  protected conflict(res: express.Response, error: BaseError): express.Response {
    return res.status(httpStatus.CONFLICT).json(this.toHttpError(error));
  }

  protected unprocessableEntity(res: express.Response, error: BaseError): express.Response {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(this.toHttpError(error));
  }
}
