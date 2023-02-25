// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import httpStatus from "http-status";

import { ExpressApp } from "@infra/http/app";
import { prisma } from "@infra/data/prisma/connection";
import { CPFHelper } from "@tests/helpers/cpf-helper";

describe("[E2E] DELETE /cpf/:cpf", () => {
  const server = supertest(new ExpressApp().app);
  const existingCPF = "17854840016";

  beforeEach(async () => {
    await prisma.cleanDb();

    await CPFHelper.insertCPF(existingCPF);
  });

  describe("Success", () => {
    it("[200::OK] Should be able to delete the CPF", async () => {
      const response = await server.delete(`/cpf/${existingCPF}`);

      expect(response.statusCode).toEqual(httpStatus.OK);
    });
  });

  describe("Failure", () => {
    it("[404::NOT_FOUND] Should return an error if the CPF is not in the shortlist", async () => {
      const fakeCPF = "23661589717";

      const response = await server.delete(`/cpf/${fakeCPF}`);

      expect(response.statusCode).toEqual(httpStatus.NOT_FOUND);
      expect(response.body).toHaveProperty("type", "NotFoundCpfException");
      expect(response.body).toHaveProperty("message", "CPF not found");
    });

    it("[422::UNPROCESSABLE_ENTITY] Should return an error if the cpf has an invalid format", async () => {
      const invalid = "23661589717invalid";

      const response = await server.delete(`/cpf/${invalid}`);

      expect(response.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
      expect(response.body).toHaveProperty("type", "InvalidCpfException");
      expect(response.body).toHaveProperty("message", "Invalid CPF format");
    });

    it("[422::UNPROCESSABLE_ENTITY] Should return an error if the cpf is invalid", async () => {
      const invalid = "17854840010";

      const response = await server.delete(`/cpf/${invalid}`);

      expect(response.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
      expect(response.body).toHaveProperty("type", "InvalidCpfException");
      expect(response.body).toHaveProperty("message", "CPF is not valid");
    });
  });
});
