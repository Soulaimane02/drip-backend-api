import joi from "joi";
import Offer from "../../models/entities/offer/offer";
import OfferStatus from "../../models/enums/offer.status";

const OfferRequestSchema = joi.object<Offer>({
  price: joi.number().min(0).required(),
  articleId: joi.string().hex().length(24).required(),
  status: joi.string().valid(...Object.values(OfferStatus)).optional()
});

export default OfferRequestSchema;
