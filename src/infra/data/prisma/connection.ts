import { PrismaClient } from "@prisma/client";

class PrismaDatabase {
  private readonly _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient({ errorFormat: "pretty" });
  }

  public get cpf() {
    return this._prisma.prismaCPF;
  }

  public async cleanDb(): Promise<void> {
    await this._prisma.$queryRaw`TRUNCATE TABLE cpfs CASCADE`;
  }
}

export type PrismaDB = PrismaDatabase;
export const prisma = new PrismaDatabase();
