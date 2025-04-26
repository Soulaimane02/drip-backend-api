import Joi from "joi";
import SellerInfo from "../../models/entities/seller/seller.info";
import DOBRequestSchema from "./dob.request.schema";
import AddressRequestSchema from "./adress.request.schema";

const SellerInfoRequestSchema = Joi.object<SellerInfo>({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
  phone: Joi.string().pattern(/^\+?[0-9\s\-]{7,15}$/).required(),
  dob: DOBRequestSchema.required(),
  address: AddressRequestSchema.required(),
});

export default SellerInfoRequestSchema;
