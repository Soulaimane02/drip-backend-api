import Offer from "../../offer/offer";

interface MessageRequestDTO {
  content: string;
  isUpdated: boolean;
  isOffer: boolean;
  userId: string;
  conversationId: string;
  offer?: Offer;
}

export default MessageRequestDTO;
