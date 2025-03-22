import Password from "../password/password";
import Role from "../../enums/role";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  rating: number;
  password: Password;
  role: Role;
}

export default User;
