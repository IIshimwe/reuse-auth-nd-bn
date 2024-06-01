import Joi from "joi";

export const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(100).required(),
    lastName: Joi.string().min(3).max(100).required(),
    profile_image: Joi.string(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};

export const validateAuth = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};

export const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    product_image: Joi.string(),
    description: Joi.string(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
  });

  return schema.validate(product);
};
