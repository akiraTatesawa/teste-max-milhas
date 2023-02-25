import * as express from "express";

export interface DeleteCPFHttpRequest extends express.Request {
  params: {
    cpf: string;
  };
}
