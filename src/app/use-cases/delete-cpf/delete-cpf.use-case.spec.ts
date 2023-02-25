import { DeleteCpfDTO } from "@app/dtos/delete-cpf.dto";
import { ApplicationErrors } from "@app/errors/application-errors";
import { CPF } from "@domain/cpf/cpf.entity";
import { DomainErrors } from "@domain/errors/domain-errors";
import { CPFFactory } from "@tests/factories/cpf-factory";
import { InMemoryCPFRepository } from "@tests/repositories/in-memory-cpf-repository";
import { DeleteCPFUseCase } from "./delete-cpf.use-case";

describe("Delete CPF Use Case", () => {
  let cpfRepository: InMemoryCPFRepository;
  let sut: DeleteCPFUseCase;
  const fakeCPF: string = "01836042027";
  const cpfEntity: CPF = CPFFactory.generate(fakeCPF);

  beforeEach(() => {
    cpfRepository = new InMemoryCPFRepository();
    sut = new DeleteCPFUseCase(cpfRepository);
  });

  describe("Success", () => {
    it("Should be able to delete a CPF from the shortlist", async () => {
      await cpfRepository.create(cpfEntity);
      const deleteCpfInput: DeleteCpfDTO = {
        cpf: fakeCPF,
      };

      const deleteCPFResultOrError = await sut.execute(deleteCpfInput);

      expect(deleteCPFResultOrError.isRight()).toEqual(true);
      expect(cpfRepository.cpfs).toHaveLength(0);
    });
  });

  describe("Failure", () => {
    it("Should return an error if the cpf format is invalid (e.g. has punctuation)", async () => {
      const deleteCpfInput: DeleteCpfDTO = {
        cpf: "663.062.650-82",
      };

      const deleteCPFResultOrError = await sut.execute(deleteCpfInput);

      expect(deleteCPFResultOrError.isLeft()).toEqual(true);
      expect(deleteCPFResultOrError.result).toBeInstanceOf(DomainErrors.InvalidCpfException);
      expect(deleteCPFResultOrError.result).toHaveProperty("type", "InvalidCpfException");
      expect(deleteCPFResultOrError.result).toHaveProperty("message", "Invalid CPF format");
    });

    it("Should return an error if the cpf is invalid (e.g. does not follow the cpf rules)", async () => {
      const deleteCpfInput: DeleteCpfDTO = {
        cpf: "17854840099",
      };

      const deleteCPFResultOrError = await sut.execute(deleteCpfInput);

      expect(deleteCPFResultOrError.isLeft()).toEqual(true);
      expect(deleteCPFResultOrError.result).toBeInstanceOf(DomainErrors.InvalidCpfException);
      expect(deleteCPFResultOrError.result).toHaveProperty("type", "InvalidCpfException");
      expect(deleteCPFResultOrError.result).toHaveProperty("message", "CPF is not valid");
    });

    it("Should return an error if the cpf cannot be found", async () => {
      const deleteCpfInput: DeleteCpfDTO = {
        cpf: fakeCPF,
      };

      const cpfOrError = await sut.execute(deleteCpfInput);

      expect(cpfOrError.isLeft()).toEqual(true);
      expect(cpfOrError.result).toBeInstanceOf(ApplicationErrors.NotFoundCpfException);
      expect(cpfOrError.result).toHaveProperty("type", "NotFoundCpfException");
      expect(cpfOrError.result).toHaveProperty("message", "CPF not found");
    });
  });
});
