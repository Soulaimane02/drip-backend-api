interface PaymentResponseDTO {
  id: string;
  description: string;
  userId: string;
  articleId: string;
  stripeId: string;
  createdAt: Date;
}

export default PaymentResponseDTO;
