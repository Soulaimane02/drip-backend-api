import Role from "../../../enums/role";
import Password from "../../password/password";

interface UserRequestDTO {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  password: Password;
  role: Role;
}

export default UserRequestDTO;
