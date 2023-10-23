import Joi from 'joi';
export const userInputValidator = Joi.object({
  firstName: Joi.string().trim().min(1).required(),
  lastName: Joi.string().trim().min(1).required(),
  username: Joi.string().trim().min(1).required()
});
