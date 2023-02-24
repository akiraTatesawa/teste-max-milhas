import { DomainErrors } from "@domain/errors/domain-errors";
import { CPFValueObject } from "./cpf.vo";

describe("CPF Value Object", () => {
  describe("Success", () => {
    it("Should be able to create a CPF Value Object from a valid cpf", () => {
      const fakeCPF: string = "86917671118";

      const cpfValueObjectOrError = CPFValueObject.create(fakeCPF);

      expect(cpfValueObjectOrError.isRight()).toEqual(true);
      expect(cpfValueObjectOrError.result).toBeInstanceOf(CPFValueObject);
      expect(cpfValueObjectOrError.result).toHaveProperty("value", fakeCPF);
    });
  });

  describe("Failure", () => {
    it("Should return an error if the cpf format is invalid", () => {
      const invalidFormatCPF: string = "8691invalid7671118";

      const cpfValueObjectOrError = CPFValueObject.create(invalidFormatCPF);

      expect(cpfValueObjectOrError.isLeft()).toEqual(true);
      expect(cpfValueObjectOrError.result).toBeInstanceOf(DomainErrors.InvalidCpfException);
      expect(cpfValueObjectOrError.result).toHaveProperty("message", "Invalid CPF format");
      expect(cpfValueObjectOrError.result).toHaveProperty("type", "InvalidCpfException");
    });

    it("Should return an error if the cpf value is invalid", () => {
      const invalidCPF: string = "86917671199";

      const cpfValueObjectOrError = CPFValueObject.create(invalidCPF);

      expect(cpfValueObjectOrError.isLeft()).toEqual(true);
      expect(cpfValueObjectOrError.result).toBeInstanceOf(DomainErrors.InvalidCpfException);
      expect(cpfValueObjectOrError.result).toHaveProperty("message", "CPF is not valid");
      expect(cpfValueObjectOrError.result).toHaveProperty("type", "InvalidCpfException");
    });

    it("Should return an error if the cpf is composed by only repeated numbers", () => {
      const invalidCPF: string = "11111111111";

      const cpfValueObjectOrError = CPFValueObject.create(invalidCPF);

      expect(cpfValueObjectOrError.isLeft()).toEqual(true);
      expect(cpfValueObjectOrError.result).toBeInstanceOf(DomainErrors.InvalidCpfException);
      expect(cpfValueObjectOrError.result).toHaveProperty("message", "CPF is not valid");
      expect(cpfValueObjectOrError.result).toHaveProperty("type", "InvalidCpfException");
    });
  });
});
