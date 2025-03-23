import Mapper from "../config/mapper";
import Article from "../models/entities/article/article";
import ArticleRequestDTO from "../models/entities/article/dto/article.request.dto";
import ArticleResponseDTO from "../models/entities/article/dto/article.response.dto";

class ArticleMapper implements Mapper<Article, ArticleRequestDTO, ArticleResponseDTO> {
  toEntity(dto: ArticleRequestDTO): Article {
    return {
      id: "",
      name: dto.name,
      description: dto.description,
      price: dto.price,
      pictures: dto.pictures,
      likes: 0,
      views: 0,
      condition: dto.condition,
      categories: dto.categories,
      size: dto.size,
      color: dto.color
    };
  }

  toRequestDTO(entity: Article): ArticleRequestDTO {
    return {
      name: entity.name,
      description: entity.description,
      price: entity.price,
      pictures: entity.pictures,
      condition: entity.condition,
      categories: entity.categories,
      size: entity.size,
      color: entity.color
    };
  }

  toResponseDTO(entity: Article): ArticleResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      pictures: entity.pictures,
      likes: entity.likes,
      views: entity.views,
      condition: entity.condition,
      categories: entity.categories,
      size: entity.size,
      color: entity.color
    };
  }
}

export default ArticleMapper;
