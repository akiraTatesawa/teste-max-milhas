import * as express from "express";

export interface CreateCPFHttpRequest extends express.Request {
  body: {
    cpf: string;
  };
}
