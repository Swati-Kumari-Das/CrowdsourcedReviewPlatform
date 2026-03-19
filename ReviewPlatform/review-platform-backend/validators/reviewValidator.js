const Joi = require("joi");

exports.reviewSchema = Joi.object({
  businessId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().allow(""),
});