import Offer from "../../offer/offer";

interface MessageResponseDTO {
  id: string;
  content: string;
  isUpdated: boolean;
  isOffer: boolean;
  createdAt: Date;
  userId: string;
  conversationId: string;
  pictures?: string[];
  offer?: Offer;
}

export default MessageResponseDTO;
