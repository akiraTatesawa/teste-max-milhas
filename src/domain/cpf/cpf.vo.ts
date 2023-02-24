import { ValueObject } from "@core/domain/value-object";
import { Either, left, right } from "@core/logic/either";
import { DomainErrors } from "@domain/errors/domain-errors";

interface CPFValueObjectProps {
  value: string;
}

type ValidationResult = Either<DomainErrors.InvalidCpfException, null>;

/**
 * A value object representing the CPF string. It is responsible for all the CPF format
 * validations and domain businesses rules.
 *
 * This class cannot be directly instantiated.
 * Call the static method `create(cpf)` with a string CPF to create a `CPFValueObject`.
 */
export class CPFValueObject extends ValueObject<CPFValueObjectProps> {
  private constructor(props: CPFValueObjectProps) {
    super(props);
  }

  public get value(): string {
    return this._props.value;
  }

  private static calculateDigit(digits: number[]): number {
    const sum: number = digits.reduce((prev, curr, index, array) => {
      const factor = array.length + 1 - index;

      return prev + factor * curr;
    }, 0);

    if (sum % 11 < 2) {
      return 0;
    }
    return 11 - (sum % 11);
  }

  private static validateFormat(cpf: string): ValidationResult {
    const cpfRegex: RegExp = /[0-9]{11}/g;
    if (!cpfRegex.test(cpf)) {
      return left(new DomainErrors.InvalidCpfException("Invalid CPF format"));
    }
    return right(null);
  }

  private static validateDigits(cpf: string): ValidationResult {
    const firstNineDigits: number[] = cpf
      .slice(0, 9)
      .split("")
      .map((digit) => parseInt(digit, 10));
    const tenthDigit: number = CPFValueObject.calculateDigit(firstNineDigits);
    const eleventhDigit: number = CPFValueObject.calculateDigit([...firstNineDigits, tenthDigit]);

    if (tenthDigit.toString() !== cpf.charAt(9) || eleventhDigit.toString() !== cpf.charAt(10)) {
      return left(new DomainErrors.InvalidCpfException("CPF is not valid"));
    }
    return right(null);
  }

  private static validateRepeatedDigits(cpf: string): ValidationResult {
    const cpfArray: number[] = cpf.split("").map((digit) => parseInt(digit, 10));
    const isCpfRepeatedDigits: boolean = cpfArray.every((digit) => digit === cpfArray[0]);

    if (isCpfRepeatedDigits) {
      return left(new DomainErrors.InvalidCpfException("CPF is not valid"));
    }
    return right(null);
  }

  private static validate(cpf: string): ValidationResult {
    const formatValidationResult = CPFValueObject.validateFormat(cpf);
    if (formatValidationResult.isLeft()) {
      return left(formatValidationResult.result);
    }

    const digitsValidationResult = CPFValueObject.validateDigits(cpf);
    if (digitsValidationResult.isLeft()) {
      return left(digitsValidationResult.result);
    }

    const repeatedDigitsValidationResult = CPFValueObject.validateRepeatedDigits(cpf);
    if (repeatedDigitsValidationResult.isLeft()) {
      return left(repeatedDigitsValidationResult.result);
    }

    return right(null);
  }

  public static create(cpf: string): Either<DomainErrors.InvalidCpfException, CPFValueObject> {
    const validationResult = CPFValueObject.validate(cpf);

    if (validationResult.isLeft()) {
      return left(validationResult.result);
    }

    const cpfValueObject = new CPFValueObject({ value: cpf });

    return right(cpfValueObject);
  }
}
