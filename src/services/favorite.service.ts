import FavoriteMapper from "../mappers/favorite.mapper";
import FavoriteRequestDTO from "../models/entities/favorite/dto/favorite.request.dto";
import FavoriteResponseDTO from "../models/entities/favorite/dto/favorite.response.dto";
import FavoriteRepository from "../repositories/favorite.repository";

class FavoriteService {
  private readonly favoriteRepository: FavoriteRepository;
  private readonly favoriteMapper: FavoriteMapper;

  constructor() {
    this.favoriteRepository = new FavoriteRepository();
    this.favoriteMapper = new FavoriteMapper();
  }

  async getAllFavorites(): Promise<FavoriteResponseDTO[]> {
    const favorites = await this.favoriteRepository.getAll();
    return favorites.map((favorite) => this.favoriteMapper.toResponseDTO(favorite));
  }

  async getByUserId(userId: string): Promise<FavoriteResponseDTO[]> {
    const favorites = await this.favoriteRepository.getByUserId(userId);
    return favorites.map((favorite) => this.favoriteMapper.toResponseDTO(favorite));
  }

  async getByArticleId(articleId: string): Promise<FavoriteResponseDTO[]> {
    const favorites = await this.favoriteRepository.getByArticleId(articleId);
    return favorites.map((favorite) => this.favoriteMapper.toResponseDTO(favorite));
  }

  async addFavorite(favoriteDto: FavoriteRequestDTO): Promise<FavoriteResponseDTO> {
    const favoritesOfUser = await this.favoriteRepository.getByUserId(favoriteDto.userId);
    const existingFavorite = favoritesOfUser.find((favorite) => favorite.articleId === favoriteDto.articleId);
    if(existingFavorite) {
      throw new Error("Favorite already exists");
    }
    
    const favorite = this.favoriteMapper.toEntity(favoriteDto);
    const addedFavorite = await this.favoriteRepository.add(favorite);
    return this.favoriteMapper.toResponseDTO(addedFavorite);
  }

  async deleteFavorite(id: string): Promise<void> {
    return this.favoriteRepository.delete(id);
  }
}

export default FavoriteService;
