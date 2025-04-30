import UserMapper from "../mappers/user.mapper";
import UserRequestDTO from "../models/entities/user/dto/user.request.dto";
import UserResponseDTO from "../models/entities/user/dto/user.response.dto";
import UserRepository from "../repositories/user.repository";
import Stripe from "stripe";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import SellerInfo from "../models/entities/seller/seller.info";
import Role from "../models/enums/role";

dotenv.config();

const STRIPE_API_KEY = process.env.STRIPE_API_KEY as string;
const SALT_ROUNDS = 10;

class UserService {
  private readonly userRepository: UserRepository;
  private readonly userMapper: UserMapper;
  private readonly stripeService: Stripe;

  constructor() {
    this.userRepository = new UserRepository();
    this.userMapper = new UserMapper();
    this.stripeService = new Stripe(STRIPE_API_KEY);
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.getAll();
    return users.map((user) => this.userMapper.toResponseDTO(user));
  }

  async getUserById(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.get(id);
    return this.userMapper.toResponseDTO(user);
  }

  async becomeSeller(id: string, sellerInfo: SellerInfo): Promise<UserResponseDTO> {
    try {
      const user = await this.userRepository.get(id);
      if(user.role === Role.Seller) {
        throw new Error("User is already a seller");
      }

      const account = await this.stripeService.accounts.create({
        type: "express",
        country: "FR",
        email: sellerInfo.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_type: "individual",
        individual: {
          first_name: sellerInfo.firstName,
          last_name: sellerInfo.lastName,
          email: sellerInfo.email,
          phone: sellerInfo.phone,
          dob: {
            day: sellerInfo.dob.day,
            month: sellerInfo.dob.month,
            year: sellerInfo.dob.year,
          },
          address: {
            line1: sellerInfo.address.line1,
            city: sellerInfo.address.city,
            postal_code: sellerInfo.address.postalCode,
            state: sellerInfo.address.state,
            country: sellerInfo.address.country,
          },
        },
        tos_acceptance: {
          date: Math.floor(Date.now() / 1000),
          ip: sellerInfo.ipAddress,
        },
      });

      const externalAccount = await this.stripeService.accounts.createExternalAccount(account.id, {
        external_account: {
          object: "bank_account",
          country: "FR",
          currency: "eur",
          account_holder_name: sellerInfo.titularName,
          account_holder_type: "individual",
          account_number: sellerInfo.iban,
        },
      });

      user.role = Role.Seller;
      user.stripeId = account.id;
      user.stripeBankAccountId = externalAccount.id;
      
      const updatedUser = await this.userRepository.put(id, user);
      return this.userMapper.toResponseDTO(updatedUser);
    }
    catch(err) {
      if(err instanceof Stripe.errors.StripeError) {
        throw new Error(`Stripe seller error: ${err.message}`);
      }

      throw new Error("Unexpected become seller error");
    }
  }

  async updateUser(id: string, userDto: Partial<UserRequestDTO>, password: string): Promise<UserResponseDTO> {
    const user = this.userMapper.toEntity(userDto);

    if(userDto.password) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      user.password = {
        hash: hashedPassword,
        salt: salt
      };
    }

    const updatedUser = await this.userRepository.put(id, user);
    return this.userMapper.toResponseDTO(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

export default UserService;
