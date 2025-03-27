interface Message {
  id: string;
  content: string;
  isUpdated: boolean;
  isOffer: boolean;
  createdAt: Date;
  userId: string;
  conversationId: string;
  articleId?: string;
}

export default Message;
