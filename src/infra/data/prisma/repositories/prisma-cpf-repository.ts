import { CPFRepository } from "@app/ports/cpf-repository";
import { CPF } from "@domain/cpf/cpf.entity";
import { PrismaDB } from "../connection";
import { PrismaCPFDataMapper } from "../mappers/prisma-cpf-data-mapper";

export class PrismaCPFRepository implements CPFRepository {
  constructor(private readonly _prisma: PrismaDB) {}

  public async create(cpfEntity: CPF): Promise<void> {
    await this._prisma.cpf.create({
      data: {
        id: cpfEntity.id,
        cpf: cpfEntity.cpf.value,
        createdAt: cpfEntity.createdAt,
      },
    });
  }

  public async delete(cpf: string): Promise<void> {
    await this._prisma.cpf.delete({
      where: {
        cpf,
      },
    });
  }

  public async findByCPF(cpf: string): Promise<CPF | null> {
    const raw = await this._prisma.cpf.findUnique({
      where: {
        cpf,
      },
    });

    if (!raw) return null;

    return PrismaCPFDataMapper.toDomain(raw);
  }

  public async findAll(): Promise<CPF[]> {
    const rawArray = await this._prisma.cpf.findMany();

    return PrismaCPFDataMapper.bulkToDomain(rawArray);
  }
}
