import Password from "./password";
import Role from "./role";

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
