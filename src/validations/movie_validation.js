import Joi from "joi";

const validation = movie => {
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
        "string.base": "genre array items must be of type string"
      }),
    rating: Joi.number().required().min(0).max(10)
      .empty()
      .messages({
        "any.required": "rating is required.",
        "number.min": "rating must be a minimum of 0",
        "number.max": "rating must be a maximum of 10",
        "number.empty": "rating cannot be an empty field.",
        "number.base": "rating must be a nnumber."
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

const updateValidation = newMovie => {
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

export { validation, validateId, updateValidation };
