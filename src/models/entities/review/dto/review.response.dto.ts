interface ReviewResponseDTO {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  articleId: string;
  createdAt: Date;
}

export default ReviewResponseDTO;
