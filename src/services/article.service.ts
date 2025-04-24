import ArticleMapper from "../mappers/article.mapper";
import ArticleRequestDTO from "../models/entities/article/dto/article.request.dto";
import ArticleResponseDTO from "../models/entities/article/dto/article.response.dto";
import ArticleRepository from "../repositories/article.repository";

class ArticleService {
  private readonly articleRepository: ArticleRepository;
  private readonly articleMapper: ArticleMapper;

  constructor() {
    this.articleRepository = new ArticleRepository();
    this.articleMapper = new ArticleMapper();
  }

  async getAllArticles(): Promise<ArticleResponseDTO[]> {
    const articles = await this.articleRepository.getAll();
    return articles.map((article) => this.articleMapper.toResponseDTO(article));
  }

  async getArticleById(id: string): Promise<ArticleResponseDTO> {
    const article = await this.articleRepository.get(id);
    return this.articleMapper.toResponseDTO(article);
  }

  async getArticlesByCategory(categoryId: string): Promise<ArticleResponseDTO[]> {
    const articles = await this.articleRepository.getByCategory(categoryId);
    return articles.map((article) => this.articleMapper.toResponseDTO(article));
  }

  async addArticle(articleDto: ArticleRequestDTO): Promise<ArticleResponseDTO> {
    const article = this.articleMapper.toEntity(articleDto);
    const addedArticle = await this.articleRepository.add(article);
    return this.articleMapper.toResponseDTO(addedArticle);
  }

  async updateArticle(id: string, articleDto: Partial<ArticleRequestDTO>): Promise<ArticleResponseDTO> {
    const article = this.articleMapper.toEntity(articleDto);
    const updatedArticle = await this.articleRepository.put(id, article);
    return this.articleMapper.toResponseDTO(updatedArticle);
  }

  async deleteArticle(id: string): Promise<void> {
    await this.articleRepository.delete(id);
  }
}

export default ArticleService;
