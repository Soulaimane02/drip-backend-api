import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserRepository from "../repositories/user.repository";
import UserRequestDTO from "../models/entities/user/dto/user.request.dto";
import UserResponseDTO from "../models/entities/user/dto/user.response.dto";
import Role from "../models/enums/role";
import UserMapper from "../mappers/user.mapper";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;
const SALT_ROUNDS = 10;

class AuthService {
  private userRepository: UserRepository;
  private userMapper: UserMapper;

  constructor() {
    this.userRepository = new UserRepository();
    this.userMapper = new UserMapper();
  }

  async register(userDto: UserRequestDTO, password: string): Promise<string> {
    const existingUser = await this.userRepository.getByEmail(userDto.email);
    if(existingUser) {
      throw new Error("Email already exists");
    }

    const user = this.userMapper.toEntity(userDto);

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = {
      hash: hashedPassword,
      salt: salt
    };

    user.role = user.role || Role.User;
    
    const userAdded = await this.userRepository.add(user);

    return jwt.sign({
      id: userAdded.id,
      email: userAdded.email,
      role: userAdded.role
    },
    SECRET_KEY,
    { expiresIn: "1h" });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.getByEmail(email);
    if(!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password.hash);
    if(!isValidPassword) {
      throw new Error("Invalid password");
    }

    return jwt.sign({ 
      id: user.id,
      email: user.email,
      role: user.role
    },
    SECRET_KEY, 
    { expiresIn: "1h" });
  }

  async decodeToken(token: string): Promise<UserResponseDTO> {
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
      return await this.userRepository.get(decoded.id);
    }
    catch {
      throw new Error("Invalid token");
    }
  }
}

export default AuthService;
