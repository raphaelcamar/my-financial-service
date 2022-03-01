import { NextFunction, Request, Response } from "express"
import Joi from "joi"

export class TransactionValidation {
  validate(req: Request, res: Response, next: NextFunction) {
    try {
      this.TransactionValidationSchema.validate(req.body)
      next()
    } catch (err) {
      console.log(err)
    }
  }

  private RecurrentValidationSchema = {
    endOfRecurrence: Joi.date().greater("now").required(),
    recurrenceDate: Joi.number().max(31).min(1).required().message("Informe o dia da recorrência"),
  }

  private TransactionValidationSchema = Joi.object({
    userId: Joi.string().min(6).required().message("UserId need to be defined"),
    billedAt: Joi.date().required(),
    description: Joi.string().required().message("Descrição não pode ser vazia"),
    type: Joi.string().valid("ENTRANCE", "SPENT", "CURRENT").required().message("Informe o tipo"),
    value: Joi.number().required().message("Valor não informado"),
    topic: Joi.string().valid("FOOD", "TRANSPORT", "HEALTH", "OTHER"),
    recurrent: this.RecurrentValidationSchema,
  })
}
