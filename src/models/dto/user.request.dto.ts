import { IsEmail, IsString, MinLength, Min, Max, IsEnum } from "class-validator";
import Role from "../enums/role";

class UserRequestDTO {
  @IsEmail()
  email!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @Min(0)
  @Max(5)
  rating!: number;

  @MinLength(8)
  password!: string;

  @IsEnum(Role)
  role!: Role;
}

export default UserRequestDTO;
