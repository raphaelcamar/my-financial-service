import { ValidationError } from "@transaction/data"
import { Transaction } from "@transaction/domain"
import Joi from "joi"

export class TransactionValidation {
  constructor(private transaction: Transaction) {}

  validate() {
    const result = this.TransactionValidationSchema.validate(this.transaction, {
      allowUnknown: true,
    })

    return result?.error || null
  }

  private TransactionValidationSchema = Joi.object({
    billedAt: Joi.date().required().messages({
      "date.base": "Data no formato inválido",
      "any.required": "Deve informar a data",
    }),
    anotation: Joi.string().required().messages({
      "string.base": "Anotação no formato inválido",
      "any.required": "Deve informar a anotação",
    }),
    type: Joi.string().valid("ENTRANCE", "SPENT").required().messages({
      "any.only": "A opção de tipo não deve ser diferente das opções citadas acima",
      "any.required": "Deve informar o tipo",
    }),
    value: Joi.number().required().messages({
      "number.base": "Valor deve ser numérico",
      "any.required": "Valor deve ser informado",
    }),
    topic: Joi.string().valid("FOOD", "TRANSPORT", "HEALTH", "OTHER").required().messages({
      "any.only": "A opção de tópico não deve ser diferente das opções citadas acima",
      "any.required": "Deve informar o tópico",
    }),
  })
}
