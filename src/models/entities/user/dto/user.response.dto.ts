import Role from "../../../enums/role";

interface UserResponseDTO {
  email: string;
  firstName: string;
  lastName: string;
  rating: number;
  role: Role;
}

export default UserResponseDTO;
