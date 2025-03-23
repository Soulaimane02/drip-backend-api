import Mapper from "../config/mapper";
import User from "../models/entities/user/user";
import UserRequestDTO from "../models/entities/user/dto/user.request.dto";
import UserResponseDTO from "../models/entities/user/dto/user.response.dto";

class UserMapper implements Mapper<User, UserRequestDTO, UserResponseDTO> {
  toEntity(dto: UserRequestDTO): User {
    return {
      id: "",
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      rating: dto.rating,
      password: {
        hash: dto.password.hash,
        salt: dto.password.salt
      },
      role: dto.role
    };
  }

  toRequestDTO(entity: User): UserRequestDTO {
    return {
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      rating: entity.rating,
      password: entity.password,
      role: entity.role
    };
  }

  toResponseDTO(entity: User): UserResponseDTO {
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      rating: entity.rating,
      role: entity.role
    };
  }
}

export default UserMapper;
