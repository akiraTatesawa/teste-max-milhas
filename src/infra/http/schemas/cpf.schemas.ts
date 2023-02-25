import Joi from "joi";

export namespace CPFSchemas {
  export const createCpfSchema = Joi.object<{ cpf: string }>({
    cpf: Joi.string().required().messages({
      "string.base": "'cpf' must be a string",
      "string.empty": "'cpf' cannot be an empty field",
      "any.required": "'cpf' is required",
    }),
  });
}
