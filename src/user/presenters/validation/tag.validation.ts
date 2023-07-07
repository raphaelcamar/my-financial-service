import { ValidateFields, ValidateResponse } from "@core/generic/data/protocols"
import { Tag } from "@user/domain/entities"
import Joi from "joi"

export class TagValidation implements ValidateFields {
  constructor(private tag: Tag) {}

  validate(): ValidateResponse {
    const result = this.TagValidationSchema.validate(this.tag, {
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

  private TagValidationSchema = Joi.object({
    description: Joi.string().max(40).required().messages({
      "string.base": "Descrição no formato inválido",
      "any.required": "Deve informar a descrição",
      "string.max": "Descrição de no máximo quarenta caracteres",
    }),
    color: Joi.string().valid("primary", "error", "warning", "grey", "success", "info", "default", "secondary", "white").required().messages({
      "any.only": "A opção deve ser uma cor válida",
      "any.base": "Informe uma cor correta",
      "any.required": "Deve informar uma cor",
    }),
    title: Joi.string().max(20).required().messages({
      "string.base": "Título no formato inválido",
      "any.required": "Deve informar o título",
      "string.max": "Título de no máximo vinte caracteres",
    }),
  })
}
