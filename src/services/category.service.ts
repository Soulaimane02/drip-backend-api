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

  async getChildrenCategories(parentId: string): Promise<CategoryResponseDTO[]> {
    const children = await this.categoryRepository.getChildren(parentId);
    return children.map((category) => this.categoryMapper.toResponseDTO(category));
  }

  async getCategoryTree(categoryId: string): Promise<string> {
    let category = await this.categoryRepository.get(categoryId);
    let tree: string[] = [];
  
    while(category) {
      tree.unshift(category.name);
      if(!category.parent) {
        break;
      }
      
      category = await this.categoryRepository.get(category.parent);
    }
  
    return tree.join(" / ");
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
