import ReviewRequestDTO from "../models/entities/review/dto/review.request.dto";
import ReviewResponseDTO from "../models/entities/review/dto/review.response.dto";
import Review from "../models/entities/review/review";
import IMapper from "./mapper";

class ReviewMapper implements IMapper<Review, ReviewRequestDTO, ReviewResponseDTO> {
  toEntity(dto: ReviewRequestDTO): Review {
    return {
      id: "",
      rating: dto.rating,
      comment: dto.comment,
      userId: dto.userId,
      articleId: dto.articleId,
      createdAt: new Date(),
      pictures: dto.pictures
    };
  }

  toRequestDTO(entity: Review): ReviewRequestDTO {
    return {
      rating: entity.rating,
      comment: entity.comment,
      userId: entity.userId,
      articleId: entity.articleId,
      pictures: entity.pictures
    };
  }

  toResponseDTO(entity: Review): ReviewResponseDTO {
    return {
      id: entity.id,
      rating: entity.rating,
      comment: entity.comment,
      userId: entity.userId,
      articleId: entity.articleId,
      createdAt: entity.createdAt,
      pictures: entity.pictures
    };
  }
}

export default ReviewMapper;
