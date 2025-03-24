import CategoryMapper from "../mappers/category.mapper";
import CategoryRequestDTO from "../models/entities/category/dto/category.request.dto";
import CategoryResponseDTO from "../models/entities/category/dto/category.response.dto";
import CategoryRepository from "../repositories/category.repository";

class CategoryService {
  private readonly categoryRepository: CategoryRepository;
  private readonly categoryMapper: CategoryMapper;

  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.categoryMapper = new CategoryMapper();
  }

  async getAllCategories(): Promise<CategoryResponseDTO[]> {
    const categories = await this.categoryRepository.getAll();
    return categories.map((category) => this.categoryMapper.toResponseDTO(category));
  }

  async addCategory(categoryDto: CategoryRequestDTO): Promise<CategoryResponseDTO> {
    const category = this.categoryMapper.toEntity(categoryDto);
    const addedCategory = await this.categoryRepository.add(category);
    return this.categoryMapper.toResponseDTO(addedCategory);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}

export default CategoryService;
