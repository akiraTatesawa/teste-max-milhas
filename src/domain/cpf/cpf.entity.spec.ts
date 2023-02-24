import { DomainErrors } from "@domain/errors/domain-errors";
import { randPastDate, randUuid } from "@ngneat/falso";
import { CPF } from "./cpf.entity";
import { CPFValueObject } from "./cpf.vo";

describe("CPF Entity", () => {
  describe("Success", () => {
    it("Should be able to create a CPF Entity", () => {
      const fakeCPF: string = "76554283870";

      const cpfOrError = CPF.create(fakeCPF);

      expect(cpfOrError.isRight()).toEqual(true);
      expect(cpfOrError.result).toBeInstanceOf(CPF);
      expect(cpfOrError.result).toHaveProperty("id", expect.any(String));
      expect(cpfOrError.result).toHaveProperty("createdAt", expect.any(Date));
      expect(cpfOrError.result).toHaveProperty("cpf", expect.any(CPFValueObject));
      expect(cpfOrError.result).toHaveProperty("cpf.value", fakeCPF);
    });

    it("Should be able to reconstitute a CPF Entity", () => {
      const fakeCPFProps = {
        id: randUuid(),
        cpf: "66467117719",
        createdAt: randPastDate(),
      };

      const cpfOrError = CPF.reconstitute(fakeCPFProps);

      expect(cpfOrError.isRight()).toEqual(true);
      expect(cpfOrError.result).toBeInstanceOf(CPF);
      expect(cpfOrError.result).toHaveProperty("id", fakeCPFProps.id);
      expect(cpfOrError.result).toHaveProperty("createdAt", fakeCPFProps.createdAt);
      expect(cpfOrError.result).toHaveProperty("cpf", expect.any(CPFValueObject));
      expect(cpfOrError.result).toHaveProperty("cpf.value", fakeCPFProps.cpf);
    });
  });

  describe("Failure", () => {
    it("Method 'create' should return an error if the CPF is invalid", () => {
      const invalid: string = "76554283999";

      const cpfOrError = CPF.create(invalid);

      expect(cpfOrError.isLeft()).toEqual(true);
      expect(cpfOrError.result).toBeInstanceOf(DomainErrors.InvalidCpfException);
      expect(cpfOrError.result).toHaveProperty("type", "InvalidCpfException");
      expect(cpfOrError.result).toHaveProperty("message", "CPF is not valid");
    });

    it("Method 'reconstitute' should return an error if the CPF is invalid", () => {
      const invalidCPFProps = {
        id: randUuid(),
        cpf: "66467117999",
        createdAt: randPastDate(),
      };

      const cpfOrError = CPF.reconstitute(invalidCPFProps);
      expect(cpfOrError.isLeft()).toEqual(true);
      expect(cpfOrError.result).toBeInstanceOf(DomainErrors.InvalidCpfException);
      expect(cpfOrError.result).toHaveProperty("type", "InvalidCpfException");
      expect(cpfOrError.result).toHaveProperty("message", "CPF is not valid");
    });
  });
});
