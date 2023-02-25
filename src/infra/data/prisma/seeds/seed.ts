import { WinstonLogger } from "@infra/http/logger/logger";
import { PrismaClient, PrismaCPF } from "@prisma/client";

export class Seed {
  private static generateSeedData(): PrismaCPF[] {
    return [
      {
        id: "5b4f4bfd-b1dc-4e13-904a-03bb4151bc3c",
        createdAt: new Date(),
        cpf: "00247785750",
      },
      {
        id: "5b2212ea-e7b8-41af-bdab-6b523b56b82f",
        createdAt: new Date(),
        cpf: "65664224983",
      },
      {
        id: "2e2976db-19d0-4d44-a0d4-303033238249",
        createdAt: new Date(),
        cpf: "21227881274",
      },
    ];
  }

  public static async execute(): Promise<void> {
    const prismaClient = new PrismaClient();
    const logger = WinstonLogger.create();

    logger.info("Truncating all tables...");
    await prismaClient.$queryRaw`TRUNCATE TABLE cpfs CASCADE`;
    logger.info("OK");

    logger.info("Creating seed data...");
    await prismaClient.prismaCPF.createMany({
      data: Seed.generateSeedData(),
    });
    logger.info("OK");
  }
}

Seed.execute().catch(() => {
  process.exit(1);
});
