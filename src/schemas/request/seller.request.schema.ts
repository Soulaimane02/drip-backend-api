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
  ipAddress: Joi.string().ip({ version: ['ipv4', 'ipv6'], cidr: 'forbidden' }).required(),
  iban: Joi.string().length(22).pattern(/^FR[0-9]{12}[0-9]{11}[0-9]{2}$/).required(),
  titularName: Joi.string().min(1).max(30).required()
});

export default SellerInfoRequestSchema;
