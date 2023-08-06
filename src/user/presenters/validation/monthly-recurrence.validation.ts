import { ValidateFields, ValidateResponse } from "@core/generic/data/protocols"
import { MonthlyRecurrence } from "@user/domain/entities"
import Joi from "joi"

export class MonthlyRecurrenceValidation implements ValidateFields {
  constructor(private transaction: MonthlyRecurrence) {}

  validate(): ValidateResponse {
    const result = this.TransactionValidationSchema.validate(this.transaction, {
      allowUnknown: true,
      abortEarly: false,
    })

    if (result?.error) {
      const error = result?.error?.details?.[0]?.message
      const stack = result?.error?.details

      return { error, stack }
    }
    return null
  }

  private TransactionValidationSchema = Joi.object({
    description: Joi.string().max(40).required().messages({
      "string.base": "Descrição no formato inválido",
      "any.required": "Deve informar a descrição",
      "string.max": "Descrição de no máximo quarenta caracteres",
    }),

    title: Joi.string().max(30).required().messages({
      "string.base": "Título no formato inválido",
      "any.required": "Deve informar o título",
      "string.max": "Título de no máximo vinte caracteres",
    }),

    value: Joi.number().required().messages({
      "number.base": "Valor deve ser numérico",
      "any.required": "Valor deve ser informado",
    }),

    tags: Joi.array().required().messages({
      "array.required": "deve informar alguma tag",
    }),
  })
}
