import Joi from "joi"

export interface ValidateResponse {
  error: string
  stack: Joi.ValidationErrorItem[]
}

export interface ValidateFields {
  validate: () => ValidateResponse
}
