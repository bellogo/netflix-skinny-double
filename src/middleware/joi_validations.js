/* eslint-disable valid-jsdoc */
const Joi = require("joi");
const helpers = require("../utilities/helpers");

export default class Validations {
/**
 *
 *
 * @static
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @memberof Validations
 */
  static async movieCreateValidation(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().empty().required(),
      genre: Joi.array().items(Joi.string()).min(1),
      rating: Joi.number().integer().empty(),
      description: Joi.string().empty().required(),
      imgLink: Joi.number().min(0).max(10).empty()
        .required(),
      trailerLink: Joi.string().empty().required(),
      watchLink: Joi.string().empty(),
      downloadLq: Joi.string().empty(),
      downloadHq: Joi.string().empty(),
      watched: Joi.string().empty(),
    });
    await helpers.validateRequest(req.body, res, next, schema);
  }
}
