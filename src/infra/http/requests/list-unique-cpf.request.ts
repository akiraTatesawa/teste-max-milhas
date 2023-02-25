import * as express from "express";

export interface ListUniqueCPFHttpRequest extends express.Request {
  params: {
    cpf: string;
  };
}
