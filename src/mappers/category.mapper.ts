import Mapper from "./mapper";
import Category from "../models/entities/category/category";
import CategoryRequestDTO from "../models/entities/category/dto/category.request.dto";
import CategoryResponseDTO from "../models/entities/category/dto/category.response.dto";

class CategoryMapper implements Mapper<Category, CategoryRequestDTO, CategoryResponseDTO> {
  toEntity(dto: CategoryRequestDTO): Category {
    return {
      id: "",
      name: dto.name,
      parent: dto.parent
    }
  }

  toRequestDTO(entity: Category): CategoryRequestDTO {
    return {
      name: entity.name,
      parent: entity.parent
    }
  }

  toResponseDTO(entity: Category): CategoryResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      parent: entity.parent
    }
  }
}

export default CategoryMapper;
