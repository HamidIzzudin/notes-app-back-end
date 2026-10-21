import Joi from'joi';

export const notePayloadSchema = Joi.object({
  title: Joi.string().required().max(50),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

export const noteQuerySchema = Joi.object({
  title: Joi.string().empty(),
});

export const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  });
  if (error) return next(error);
  req.validated = value;
  next();
};