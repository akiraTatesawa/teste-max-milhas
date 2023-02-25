import Joi from "joi";
import * as express from "express";
import httpStatus from "http-status";
import { HttpError } from "@core/infra/http/http-error";

export class SchemaValidator {
  private static toHttpError(error: Joi.ValidationError): HttpError {
    const messages = error.details.map((detailError) => detailError.message);

    return {
      type: "BadRequestException",
      message: messages.join(", "),
    };
  }

  public static validateBody(schema: Joi.ObjectSchema) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const validateOrError = schema.validate(req.body, {
        abortEarly: false,
        convert: false,
      });

      if (validateOrError.error) {
        const httpError = SchemaValidator.toHttpError(validateOrError.error);

        return res.status(httpStatus.BAD_REQUEST).json(httpError);
      }

      return next();
    };
  }
}
