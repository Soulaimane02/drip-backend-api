import IMapper from "./mapper";
import User from "../models/entities/user/user";
import UserRequestDTO from "../models/entities/user/dto/user.request.dto";
import UserResponseDTO from "../models/entities/user/dto/user.response.dto";

class UserMapper implements IMapper<User, UserRequestDTO, UserResponseDTO> {
  toEntity(dto: UserRequestDTO | Partial<UserRequestDTO>): User {
    return {
      id: "",
      email: dto.email!,
      firstName: dto.firstName!,
      lastName: dto.lastName!,
      rating: 0,
      profilePicture: dto.profilePicture!,
      password: dto.password!,
      role: dto.role!
    };
  }

  toRequestDTO(entity: User): UserRequestDTO {
    return {
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      profilePicture: entity.profilePicture,
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
      profilePicture: entity.profilePicture,
      role: entity.role
    };
  }
}

export default UserMapper;
