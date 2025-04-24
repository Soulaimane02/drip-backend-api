import ReviewMapper from "../mappers/review.mapper";
import ReviewRequestDTO from "../models/entities/review/dto/review.request.dto";
import ReviewResponseDTO from "../models/entities/review/dto/review.response.dto";
import ArticleRepository from "../repositories/article.repository";
import ReviewRepository from "../repositories/review.repository";
import UserRepository from "../repositories/user.repository";

class ReviewService {
  private readonly reviewRepository: ReviewRepository;
  private readonly reviewMapper: ReviewMapper;
  private readonly articleRepository: ArticleRepository;
  private readonly userRepository: UserRepository;

  constructor() {
    this.reviewRepository = new ReviewRepository();
    this.reviewMapper = new ReviewMapper();
    this.articleRepository = new ArticleRepository();
    this.userRepository = new UserRepository();
  }

  async getAllReviews(): Promise<ReviewResponseDTO[]> {
    const reviews = await this.reviewRepository.getAll();
    return reviews.map((review) => this.reviewMapper.toResponseDTO(review));
  }

  async getReviewsByUserId(userId: string): Promise<ReviewResponseDTO[]> {
    const reviews = await this.reviewRepository.getByUserId(userId);
    return reviews.map((review) => this.reviewMapper.toResponseDTO(review));
  }

  async getReviewsByArticleId(articleId: string): Promise<ReviewResponseDTO[]> {
    const reviews = await this.reviewRepository.getByArticleId(articleId);
    return reviews.map((review) => this.reviewMapper.toResponseDTO(review));
  }

  async getReviewById(id: string): Promise<ReviewResponseDTO> {
    const review = await this.reviewRepository.get(id);
    return this.reviewMapper.toResponseDTO(review);
  }

  async createReview(reviewDto: ReviewRequestDTO): Promise<ReviewResponseDTO> {
    const review = this.reviewMapper.toEntity(reviewDto);
    const addedReview = await this.reviewRepository.add(review);

    const article = await this.articleRepository.get(review.articleId);
    const user = await this.userRepository.get(article.userId);
    const userReviews = await this.reviewRepository.getByUserId(user.id);
    user.rating = userReviews.reduce((acc, review) => acc + review.rating, 0) / userReviews.length;
    await this.userRepository.put(user.id, user);

    return this.reviewMapper.toResponseDTO(addedReview);
  }

  async updateReview(id: string, reviewDto: Partial<ReviewRequestDTO>): Promise<ReviewResponseDTO> {
    const review = this.reviewMapper.toEntity(reviewDto);
    const updatedReview = await this.reviewRepository.put(id, review);
    return this.reviewMapper.toResponseDTO(updatedReview);
  }

  async deleteReview(id: string): Promise<void> {
    return this.reviewRepository.delete(id);
  }
}

export default ReviewService;
