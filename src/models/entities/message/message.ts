import Offer from "../offer/offer";

interface Message {
  id: string;
  content: string;
  isUpdated: boolean;
  isOffer: boolean;
  createdAt: Date;
  userId: string;
  conversationId: string;
  offer?: Offer;
}

export default Message;
