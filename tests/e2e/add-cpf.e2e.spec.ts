// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import httpStatus from "http-status";

import { ExpressApp } from "@infra/http/app";
import { prisma } from "@infra/data/prisma/connection";
import { CPFHelper } from "@tests/helpers/cpf-helper";

describe("[E2E] POST /cpf", () => {
  const server = supertest(new ExpressApp().app);

  beforeEach(async () => {
    await prisma.cleanDb();
  });

  describe("Success", () => {
    it("[201::CREATED] Should be able to add a CPF to the shortlist", async () => {
      const request = {
        cpf: "17686884945",
      };

      const response = await server.post("/cpf").send(request);

      expect(response.statusCode).toEqual(httpStatus.CREATED);
      expect(response.body).toHaveProperty("cpf", request.cpf);
      expect(response.body).toHaveProperty("createdAt", expect.any(String));
    });
  });

  describe("Failure", () => {
    it("[400::BAD_REQUEST] Should return an error if the request body is invalid", async () => {
      // Sending a number instead of a string
      const request = {
        cpf: 1,
      };

      const response = await server.post("/cpf").send(request);

      expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);
      expect(response.body).toHaveProperty("type", "BadRequestException");
      expect(response.body).toHaveProperty("message", "'cpf' must be a string");
    });

    it("[409::CONFLICT] Should return an error if the cpf is already in the shortlist", async () => {
      await CPFHelper.insertCPF("17854840016");
      const request = {
        cpf: "17854840016",
      };

      const response = await server.post("/cpf").send(request);

      expect(response.statusCode).toEqual(httpStatus.CONFLICT);
      expect(response.body).toHaveProperty("type", "ExistsCpfException");
      expect(response.body).toHaveProperty("message", "CPF is already in the shortlist");
    });

    it("[422::UNPROCESSABLE_ENTITY] Should return an error if the cpf has an invalid format", async () => {
      const request = {
        cpf: "17854840016invalid_format",
      };

      const response = await server.post("/cpf").send(request);

      expect(response.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
      expect(response.body).toHaveProperty("type", "InvalidCpfException");
      expect(response.body).toHaveProperty("message", "Invalid CPF format");
    });

    it("[422::UNPROCESSABLE_ENTITY] Should return an error if the cpf is invalid", async () => {
      const request = {
        cpf: "78300163099",
      };

      const response = await server.post("/cpf").send(request);

      expect(response.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
      expect(response.body).toHaveProperty("type", "InvalidCpfException");
      expect(response.body).toHaveProperty("message", "CPF is not valid");
    });
  });
});
