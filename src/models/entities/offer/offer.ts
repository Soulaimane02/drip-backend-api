import OfferStatus from "../../enums/offer.status";

interface Offer {
  price: number;
  articleId: string;
  status: OfferStatus;
}

export default Offer;
