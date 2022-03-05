import { Transaction } from "@transaction/domain"
import Joi from "joi"

export class TransactionValidation {
  constructor(private transaction: Transaction) {}

  validate() {
    return this.TransactionValidationSchema.validate(this.transaction)
  }

  private RecurrentValidationSchema = {
    endOfRecurrence: Joi.date().greater("now").required(),
    recurrenceDate: Joi.number().min(1).max(1),
  }

  private TransactionValidationSchema = Joi.object({
    userId: Joi.string().min(6).required(),
    billedAt: Joi.date().required(),
    description: Joi.string().required(),
    type: Joi.string().valid("ENTRANCE", "SPENT", "CURRENT").required(),
    value: Joi.number().required(),
    topic: Joi.string().valid("FOOD", "TRANSPORT", "HEALTH", "OTHER"),
    recurrent: this.RecurrentValidationSchema,
  })
}
