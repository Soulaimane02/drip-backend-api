import Role from "../../../enums/role";

interface UserResponseDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  rating: number;
  profilePicture: string;
  role: Role;
  stripeId?: string;
}

export default UserResponseDTO;
