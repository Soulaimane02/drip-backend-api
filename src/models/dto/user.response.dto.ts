import { IsEmail, IsString, MinLength, Min, Max, IsEnum } from "class-validator";
import Role from "../enums/role";

class UserResponseDTO {
  @IsEmail()
  email!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @Min(0)
  @Max(5)
  rating!: number;

  @IsEnum(Role)
  role!: Role;
}

export default UserResponseDTO;
