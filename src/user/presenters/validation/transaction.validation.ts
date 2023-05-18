import { ValidateFields, ValidateResponse } from "@core/generic/data/protocols"
import { Transaction } from "@user/domain/entities"
import Joi from "joi"

export class TransactionValidation implements ValidateFields {
  constructor(private transaction: Transaction) {}

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
    billedAt: Joi.date().required().messages({
      "date.base": "Data no formato inválido",
      "any.required": "Deve informar a data",
    }),
    anotation: Joi.string().required().messages({
      "string.base": "Anotação no formato inválido",
      "any.required": "Deve informar a anotação",
    }),
    type: Joi.string().valid("ENTRANCE", "SPENT", "RECURRENT").required().messages({
      "any.only": "A opção de tipo não deve ser diferente das opções citadas acima",
      "any.required": "Deve informar o tipo",
    }),
    value: Joi.number().required().messages({
      "number.base": "Valor deve ser numérico",
      "any.required": "Valor deve ser informado",
    }),
    topic: Joi.string().valid("FOOD", "TRANSPORT", "HEALTH", "OTHER", "LEISURE", "SALARY").required().messages({
      "any.only": "A opção de tópico não deve ser diferente das opções",
      "any.required": "Deve informar o tópico",
    }),
    paymentType: Joi.string().valid("CREDIT", "DEBIT", "MONEY", "PIX", "TRANSFER", "CRYPTO", "BANK_SLIP", "OTHER").required().messages({
      "any.only": "A opção de tópico não deve ser diferente das opções",
      "any.required": "Deve informar o tópico",
    }),
    status: Joi.string().valid("PENDING", "FINISHED").required().messages({
      "any.only": "A opção de status não deve ser diferente das opções",
      "any.required": "Deve informar o status da transação",
    }),
    coin: Joi.string().valid("USD", "BRL", "EUR", "ARS", "GBP", "JPY", "CNY", "AUD", "CAD", "CHF", "NZD").required().messages({
      "any.only": "A opção deve ser uma moeda válida",
      "any.base": "Informe um tipo de moeda correto",
      "any.required": "Deve informar o tipo da moeda",
    }),
  })
}
