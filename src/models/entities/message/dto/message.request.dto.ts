interface MessageRequestDTO {
  content: string;
  isUpdated: boolean;
  isOffer: boolean;
  userId: string;
  conversationId: string;
  articleId?: string;
}

export default MessageRequestDTO;
