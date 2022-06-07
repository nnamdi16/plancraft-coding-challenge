import HttpError from '../common/HttpError'
import Joi from 'joi'
import { Request } from "express";
import httpStatusCodes from '../common/httpStatusCode';

export const validateRequest = function (req: Request, rules: any) {
  const schema = Joi.object().keys(rules);
  return validateSchema(req, schema);
};

export function validateSchema(req: Request, schema: any) {
  const { error, value } = schema.validate({
    ...req.body,
    ...req.params,
    ...req.query,
  });

  if (error) {
    if (error.details) {
      throw new HttpError(httpStatusCodes.BAD_REQUEST, true, error.details[0].message, error);
    } else {
      throw new HttpError(error.status || httpStatusCodes.BAD_REQUEST, true,  error.message, error);
    }
  }
  return value;
}
