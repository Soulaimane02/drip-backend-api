import Joi from "joi";
import DOB from "../../models/entities/seller/dob";

const DOBRequestSchema = Joi.object<DOB>({
  day: Joi.number().integer().min(1).max(31).required(),
  month: Joi.number().integer().min(1).max(12).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() - 18).required(),
});

export default DOBRequestSchema;
