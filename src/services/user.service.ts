import UserMapper from "../mappers/user.mapper";
import UserRequestDTO from "../models/entities/user/dto/user.request.dto";
import UserResponseDTO from "../models/entities/user/dto/user.response.dto";
import UserRepository from "../repositories/user.repository";

class UserService {
  private readonly userRepository: UserRepository;
  private readonly userMapper: UserMapper;

  constructor() {
    this.userRepository = new UserRepository();
    this.userMapper = new UserMapper();
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.getAll();
    return users.map((user) => this.userMapper.toResponseDTO(user));
  }

  async getUserById(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.get(id);
    return this.userMapper.toResponseDTO(user);
  }

  async updateUser(id: string, userDto: UserRequestDTO): Promise<UserResponseDTO> {
    const user = this.userMapper.toEntity(userDto);
    const updatedUser = await this.userRepository.put(id, user);
    return this.userMapper.toResponseDTO(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

export default UserService;
