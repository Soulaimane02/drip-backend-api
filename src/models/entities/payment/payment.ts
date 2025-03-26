interface Payment {
  id: string;
  amount: number;
  description: string;
  userId: string;
  articleId: string;
  stripeId: string;
  createdAt: Date;
}

export default Payment;
