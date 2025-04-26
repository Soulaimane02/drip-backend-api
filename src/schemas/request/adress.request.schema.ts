import Joi from "joi";
import Address from "../../models/entities/seller/address";

const AddressRequestSchema = Joi.object<Address>({
  line1: Joi.string().min(1).max(255).required(),
  city: Joi.string().min(1).max(100).required(),
  postalCode: Joi.string().min(3).max(20).required(),
  state: Joi.string().min(1).max(100).required(),
  country: Joi.string().length(2).required(),
});

export default AddressRequestSchema;
