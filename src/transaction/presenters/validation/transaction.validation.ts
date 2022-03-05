import { Transaction } from "@transaction/domain"
import Joi from "joi"

export class TransactionValidation {
  constructor(private transaction: Transaction) {}

  validate() {
    return this.TransactionValidationSchema.validate(this.transaction)
  }

  private TransactionValidationSchema = Joi.object({
    userId: Joi.string().min(6).required(),
    billedAt: Joi.date().required(),
    anotation: Joi.string().required(),
    type: Joi.string().valid("ENTRANCE", "SPENT", "CURRENT").required(),
    value: Joi.number().required(),
    topic: Joi.string().valid("FOOD", "TRANSPORT", "HEALTH", "OTHER"),
  })
}
