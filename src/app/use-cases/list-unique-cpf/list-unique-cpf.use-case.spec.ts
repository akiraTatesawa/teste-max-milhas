import { InMemoryCPFRepository } from "@tests/repositories/in-memory-cpf-repository";
import { ListUniqueCpfDTO } from "@app/dtos/list-cpf.dto";
import { CPF } from "@domain/cpf/cpf.entity";
import { CPFFactory } from "@tests/factories/cpf-factory";
import { DomainErrors } from "@domain/errors/domain-errors";
import { ApplicationErrors } from "@app/errors/application-errors";
import { ListUniqueCPFUseCase } from "./list-unique-cpf.use-case";

describe("List Unique CPF Use Case", () => {
  let sut: ListUniqueCPFUseCase;
  let cpfRepository: InMemoryCPFRepository;
  const fakeCPF: string = "17854840016";
  let cpfEntity: CPF;

  beforeEach(async () => {
    cpfRepository = new InMemoryCPFRepository();
    sut = new ListUniqueCPFUseCase(cpfRepository);

    cpfEntity = CPFFactory.generate(fakeCPF);
    await cpfRepository.create(cpfEntity);
  });

  describe("Success", () => {
    it("Should be able to list a CPF and return a cpfDTO", async () => {
      const listUniqueCPFInput: ListUniqueCpfDTO = {
        cpf: fakeCPF,
      };

      const cpfOrError = await sut.execute(listUniqueCPFInput);

      expect(cpfOrError.isRight()).toEqual(true);
      expect(cpfOrError.result).toHaveProperty("id", expect.any(String));
      expect(cpfOrError.result).toHaveProperty("cpf", listUniqueCPFInput.cpf);
      expect(cpfOrError.result).toHaveProperty("createdAt", expect.any(Date));
    });
  });

  describe("Failure", () => {
    it("Should return an error if the cpf format is invalid (e.g. has punctuation)", async () => {
      const listUniqueInvalidCPFInput: ListUniqueCpfDTO = {
        cpf: "178.548.400-16",
      };

      const cpfOrError = await sut.execute(listUniqueInvalidCPFInput);

      expect(cpfOrError.isLeft()).toEqual(true);
      expect(cpfOrError.result).toBeInstanceOf(DomainErrors.InvalidCpfException);
      expect(cpfOrError.result).toHaveProperty("type", "InvalidCpfException");
      expect(cpfOrError.result).toHaveProperty("message", "Invalid CPF format");
    });

    it("Should return an error if the cpf is invalid (e.g. does not obey the cpf rules)", async () => {
      const listUniqueInvalidCPFInput: ListUniqueCpfDTO = {
        cpf: "15067871999",
      };

      const cpfOrError = await sut.execute(listUniqueInvalidCPFInput);

      expect(cpfOrError.isLeft()).toEqual(true);
      expect(cpfOrError.result).toBeInstanceOf(DomainErrors.InvalidCpfException);
      expect(cpfOrError.result).toHaveProperty("type", "InvalidCpfException");
      expect(cpfOrError.result).toHaveProperty("message", "CPF is not valid");
    });

    it("Should return an error if the cpf cannot be found", async () => {
      const listUniqueInvalidCPFInput: ListUniqueCpfDTO = {
        cpf: "85806578224",
      };

      const cpfOrError = await sut.execute(listUniqueInvalidCPFInput);

      expect(cpfOrError.isLeft()).toEqual(true);
      expect(cpfOrError.result).toBeInstanceOf(ApplicationErrors.NotFoundCpfException);
      expect(cpfOrError.result).toHaveProperty("type", "NotFoundCpfException");
      expect(cpfOrError.result).toHaveProperty("message", "CPF not found");
    });
  });
});
