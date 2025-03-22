import joi from "joi";
import User from "../../models/user";
import Role from "../../models/enums/role";

const UserRequestSchema = joi.object<User>({
  email: joi.string().email().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  rating: joi.number().min(0).max(5).required(),
  password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
  role: joi.string().valid(...Object.values(Role)).default(Role.User).optional()
});

export default UserRequestSchema;
