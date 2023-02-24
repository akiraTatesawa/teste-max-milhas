import { AddCpfDTO } from "@app/dtos/add-cpf.dto";
import { ApplicationErrors } from "@app/errors/application-errors";
import { CPF } from "@domain/cpf/cpf.entity";
import { DomainErrors } from "@domain/errors/domain-errors";
import { CPFFactory } from "@tests/factories/cpf-factory";
import { InMemoryCPFRepository } from "@tests/repositories/in-memory-cpf-repository";
import { AddCPFUseCase } from "./add-cpf.use-case";

describe("Add CPF Use Case", () => {
  let cpfRepository: InMemoryCPFRepository;
  let sut: AddCPFUseCase;

  beforeEach(() => {
    cpfRepository = new InMemoryCPFRepository();
    sut = new AddCPFUseCase(cpfRepository);
  });

  describe("Success", () => {
    it("Should be able to add a CPF to the shortlist", async () => {
      const addCpfInput: AddCpfDTO = {
        cpf: "15067871776",
      };

      const addCpfResultOrError = await sut.execute(addCpfInput);

      expect(addCpfResultOrError.isRight()).toEqual(true);
      expect(addCpfResultOrError.result).toHaveProperty("id", expect.any(String));
      expect(addCpfResultOrError.result).toHaveProperty("cpf", addCpfInput.cpf);
      expect(addCpfResultOrError.result).toHaveProperty("createdAt", expect.any(Date));
      expect(cpfRepository.cpfs).toHaveLength(1);
      expect(cpfRepository.cpfs[0].cpf.value).toEqual(addCpfInput.cpf);
    });
  });

  describe("Failure", () => {
    it("Should return an error if the cpf format is invalid (e.g. has punctuation)", async () => {
      const addInvalidCpfInput: AddCpfDTO = {
        cpf: "150.678.717-76",
      };

      const addCpfResultOrError = await sut.execute(addInvalidCpfInput);

      expect(addCpfResultOrError.isLeft()).toEqual(true);
      expect(addCpfResultOrError.result).toBeInstanceOf(DomainErrors.InvalidCpfException);
      expect(addCpfResultOrError.result).toHaveProperty("type", "InvalidCpfException");
      expect(addCpfResultOrError.result).toHaveProperty("message", "Invalid CPF format");
    });

    it("Should return an error if the cpf is invalid (e.g. does not obey the cpf rules)", async () => {
      const addInvalidCpfInput: AddCpfDTO = {
        cpf: "15067871999",
      };

      const addCpfResultOrError = await sut.execute(addInvalidCpfInput);

      expect(addCpfResultOrError.isLeft()).toEqual(true);
      expect(addCpfResultOrError.result).toBeInstanceOf(DomainErrors.InvalidCpfException);
      expect(addCpfResultOrError.result).toHaveProperty("type", "InvalidCpfException");
      expect(addCpfResultOrError.result).toHaveProperty("message", "CPF is not valid");
    });

    it("Should return an error if the cpf is invalid (e.g. is composed only by the same number)", async () => {
      const addInvalidCpfInput: AddCpfDTO = {
        cpf: "11111111111",
      };

      const addCpfResultOrError = await sut.execute(addInvalidCpfInput);

      expect(addCpfResultOrError.isLeft()).toEqual(true);
      expect(addCpfResultOrError.result).toBeInstanceOf(DomainErrors.InvalidCpfException);
      expect(addCpfResultOrError.result).toHaveProperty("type", "InvalidCpfException");
      expect(addCpfResultOrError.result).toHaveProperty("message", "CPF is not valid");
    });

    it("Should return an error if the cpf is already in the shortlist", async () => {
      const fakeCPF: string = "15067871776";
      const fakeCPFEntity: CPF = CPFFactory.generate(fakeCPF);
      const addCpfInput: AddCpfDTO = {
        cpf: fakeCPF,
      };
      cpfRepository.create(fakeCPFEntity);

      const addCpfResultOrError = await sut.execute(addCpfInput);

      expect(addCpfResultOrError.isLeft()).toEqual(true);
      expect(addCpfResultOrError.result).toBeInstanceOf(ApplicationErrors.ExistsCpfException);
      expect(addCpfResultOrError.result).toHaveProperty("type", "ExistsCpfException");
      expect(addCpfResultOrError.result).toHaveProperty(
        "message",
        "CPF is already in the shortlist"
      );
    });
  });
});
