import Joi from "joi";

const validation = user => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk", "co"] } }).min(5)
      .max(100)
      .empty()
      .messages({
        "string.min": "email must be a minimum of 5 characters",
        "string.max": "email must be a maximum of 100 characters",
        "string.empty": "email cannot be an empty field.",
        "string.email": "Please enter a valid email",
      }),

    number: Joi.string().pattern(new RegExp("^[+]([0-9])*$")).min(7)
      .max(15)
      .messages({
        "string.pattern.base": "number must begin with + and must contain only numbers.",
        "string.empty": "number cannot be an empty field",
        "string.min": "number should have a minimum length of 7",
        "string.max": "number should have a maximum length of 15"
      }),

    password: Joi.string().required().empty().min(5)
      .max(30)
      .pattern(new RegExp("^[a-zA-Z0-9]*$"))
      .messages({
        "any.required": "password is required",
        "string.pattern.base": "password must contain only alphanumeric characters.",
        "string.empty": "password cannot be an empty field",
        "string.min": "password should have a minimum length of 5",
        "string.max": "password should have a maximum length of 30"
      }),

  }).xor("email", "number").messages({
    "object.unknown": "you have used an invalid key.",
    "object.xor": "must contain either email or number"
  }).options({ abortEarly: false });
  return schema.validate(user);
};

export default validation;
