import Joi from "joi";

const movieValidation = movie => {
  const schema = Joi.object({
    title: Joi.string().required()
      .empty().messages({
        "any.required": "title is required.",
        "string.empty": "title cannot be an empty field.",
        "string.base": "title must be a string.",
      }),
    genre: Joi.array().items(Joi.string()).required()
      .empty()
      .messages({
        "any.required": "genre is required.",
        "array.base": "genre must be an array.",
        "string.base": "genre array items must be of type string."
      }),
    rating: Joi.number().required().min(0).max(10)
      .empty()
      .messages({
        "any.required": "rating is required.",
        "number.min": "rating must be a minimum of 0.",
        "number.max": "rating must be a maximum of 10.",
        "number.empty": "rating cannot be an empty field.",
        "number.base": "rating must be a number."
      }),
    description: Joi.string().required()
      .empty()
      .messages({
        "any.required": "description is required.",
        "string.empty": "description cannot be an empty field.",
        "string.base": "description must contain only alphabetical characters."
      }),
    imgLink: Joi.string().required()
      .empty()
      .messages({
        "any.required": "imgLink is required.",
        "string.empty": "imgLink cannot be an empty field.",
        "string.base": "imgLink must contain only alphabetical characters."
      }),
    trailerLink: Joi.string().messages({
      "string.base": "trailerLink must contain only alphabetical characters."
    }),
    watchLink: Joi.string().messages({
      "string.base": "watchLink must contain only alphabetical characters."
    }),
    downloadLq: Joi.string().messages({
      "string.base": "downloadLq must contain only alphabetical characters."
    }),
    downloadHq: Joi.string().messages({
      "string.base": "downloadHq must contain only alphabetical characters."
    }),
    watched: Joi.boolean().messages({
      "booleen.base": "watched must be of type booleen."
    }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(movie);
};

const validateId = id => {
  const schema = Joi.object({
    id: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")).required()
      .empty()
      .messages({
        "any.required": "id not provided. Please provide an id.",
        "string.empty": "id cannot be an empty field.",
        "string.base": "id must be a string.",
        "string.pattern.base": "id fails to match the required pattern."
      })
  }).options({ abortEarly: false });
  return schema.validate(id);
};

const updateMovieValidation = newMovie => {
  const schema = Joi.object({
    title: Joi.string()
      .empty().messages({
        "string.empty": "title cannot be an empty field.",
        "string.base": "title must be a string.",
      }),
    genre: Joi.array().items(Joi.string())
      .empty()
      .messages({
        "array.base": "genre must be an array.",
        "string.base": "genre array items must be of type string."
      }),
    rating: Joi.number().min(0).max(10)
      .empty()
      .messages({
        "number.min": "rating must be a minimum of 0",
        "number.max": "rating must be a maximum of 10",
        "number.empty": "rating cannot be an empty field.",
        "number.base": "rating must be a nnumber."
      }),
    description: Joi.string()
      .empty()
      .messages({
        "string.empty": "description cannot be an empty field.",
        "string.base": "description must contain only alphabetical characters."
      }),
    imgLink: Joi.string()
      .empty()
      .messages({
        "string.empty": "imgLink cannot be an empty field.",
        "string.base": "imgLink must contain only alphabetical characters."
      }),
    trailerLink: Joi.string().messages({
      "string.base": "trailerLink must contain only alphabetical characters."
    }),
    watchLink: Joi.string().messages({
      "string.base": "watchLink must contain only alphabetical characters."
    }),
    downloadLq: Joi.string().messages({
      "string.base": "downloadLq must contain only alphabetical characters."
    }),
    downloadHq: Joi.string().messages({
      "string.base": "downloadHq must contain only alphabetical characters."
    }),
    watched: Joi.boolean().messages({
      "booleen.base": "watched must be of type booleen."
    }),
  }).min(1)
    .messages({
      "object.min": "request body must have at least one field to update",
      "object.unknown": "You have used an invalid key."
    })
    .options({ abortEarly: false });
  return schema.validate(newMovie);
};

const userValidation = user => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk", "co"] } }).min(5)
      .max(100)
      .empty()
      .messages({
        "string.min": "email must be a minimum of 5 characters.",
        "string.max": "email must be a maximum of 100 characters.",
        "string.empty": "email cannot be an empty field.",
        "string.email": "Please enter a valid email.",
      }),

    name: Joi.string().min(2)
      .max(255).required()
      .empty()
      .messages({
        "string.base": "name must be a string.",
        "any.required": "name is required",
        "string.empty": "name cannot be an empty field.",
        "string.min": "name should have a minimum length of 2 characters.",
        "string.max": "name should have a maximum length of 255 characters."
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

export {
  movieValidation, validateId, updateMovieValidation, userValidation
};
