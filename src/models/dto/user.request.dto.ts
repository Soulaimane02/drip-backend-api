import Role from "../enums/role";
import Password from "../password";

interface UserRequestDTO {
  email: string;
  firstName: string;
  lastName: string;
  rating: number;
  password: Password;
  role: Role;
}

export default UserRequestDTO;
