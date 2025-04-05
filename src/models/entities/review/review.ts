interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  articleId: string;
  createdAt: Date;
  pictures?: string[];
}

export default Review;
