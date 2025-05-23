import joi from "joi";
import User from "../../models/entities/user/user";
import Role from "../../models/enums/role";

const UserRequestSchema = joi.object<User>({
  email: joi.string().email().required(),
  firstName: joi.string().min(3).max(100).required(),
  lastName: joi.string().min(3).max(100).required(),
  rating: joi.number().min(0).max(5).default(0).optional(),
  profilePicture: joi.string().uri().required(),
  password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/).optional(),
  role: joi.string().valid(...Object.values(Role)).default(Role.User).optional()
});

export default UserRequestSchema;
