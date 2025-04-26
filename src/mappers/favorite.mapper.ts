import FavoriteRequestDTO from "../models/entities/favorite/dto/favorite.request.dto";
import FavoriteResponseDTO from "../models/entities/favorite/dto/favorite.response.dto";
import Favorite from "../models/entities/favorite/favorite";
import IMapper from "./mapper";

class FavoriteMapper implements IMapper<Favorite, FavoriteRequestDTO, FavoriteResponseDTO> {
  toEntity(dto: FavoriteRequestDTO): Favorite {
    return {
      id: "",
      userId: dto.userId,
      articleId: dto.articleId,
      createdAt: new Date(),
    };
  }

  toRequestDTO(entity: Favorite): FavoriteRequestDTO {
    return {
      userId: entity.userId,
      articleId: entity.articleId
    };
  }

  toResponseDTO(entity: Favorite): FavoriteResponseDTO {
    return {
      id: entity.id,
      userId: entity.userId,
      articleId: entity.articleId,
      createdAt: entity.createdAt,
    };
  }
}

export default FavoriteMapper;
