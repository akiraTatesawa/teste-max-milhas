// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import httpStatus from "http-status";

import { ExpressApp } from "@infra/http/app";
import { prisma } from "@infra/data/prisma/connection";
import { CPFHelper } from "@tests/helpers/cpf-helper";

describe("[E2E] GET /cpf", () => {
  const server = supertest(new ExpressApp().app);

  beforeEach(async () => {
    await prisma.cleanDb();
  });

  describe("Success", () => {
    it("[200::OK] Should be able to list all the CPFs in the shortlist", async () => {
      await Promise.allSettled([
        CPFHelper.insertCPF("14836023629"),
        CPFHelper.insertCPF("25652684160"),
        CPFHelper.insertCPF("28451487203"),
        CPFHelper.insertCPF("12491140713"),
      ]);

      const response = await server.get("/cpf");

      expect(response.statusCode).toEqual(httpStatus.OK);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(4);
      expect(response.body[0]).toHaveProperty("cpf", expect.any(String));
      expect(response.body[0]).toHaveProperty("createdAt");
    });

    it("[200::OK] Should return an empty list if there are no CPFs in the shortlist", async () => {
      const response = await server.get("/cpf");

      expect(response.statusCode).toEqual(httpStatus.OK);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(0);
    });
  });
});
