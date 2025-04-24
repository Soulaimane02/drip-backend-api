import UserMapper from "../mappers/user.mapper";
import UserRequestDTO from "../models/entities/user/dto/user.request.dto";
import UserResponseDTO from "../models/entities/user/dto/user.response.dto";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

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

  async updateUser(id: string, userDto: UserRequestDTO, password: string): Promise<UserResponseDTO> {
    const user = this.userMapper.toEntity(userDto);

    if(userDto.password) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      user.password = {
        hash: hashedPassword,
        salt: salt
      };
    }

    const updatedUser = await this.userRepository.put(id, user);
    return this.userMapper.toResponseDTO(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

export default UserService;
