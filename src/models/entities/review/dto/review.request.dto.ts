interface ReviewRequestDTO {
  rating: number;
  comment: string;
  userId: string;
  articleId: string;
  pictures?: string[];
}

export default ReviewRequestDTO;
