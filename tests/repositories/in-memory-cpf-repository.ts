import { CPFRepository } from "@app/ports/cpf-repository";
import { CPF } from "@domain/cpf/cpf.entity";

/**
 * Simulates a database repository.
 *
 * Test-case use only.
 * @class
 * @property {Array<CPF>} cpfs - Stores the CPFs entities
 */
export class InMemoryCPFRepository implements CPFRepository {
  public cpfs: CPF[] = [];

  public async create(cpfModel: CPF): Promise<void> {
    this.cpfs.push(cpfModel);
  }

  public async findByCPF(cpf: string): Promise<CPF | null> {
    const existingCPF = this.cpfs.find((cpfEntity) => cpfEntity.cpf.value === cpf);

    return existingCPF ?? null;
  }

  public async findAll(): Promise<CPF[]> {
    return this.cpfs;
  }
}
