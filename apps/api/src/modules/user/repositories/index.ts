import { G } from "@mobily/ts-belt";
import UserModel from "../model";

const getUserById = (id: string) => UserModel.findById(id);
const getUserByEmail = (email: string) =>
  UserModel.findOne({
    email,
  });

const getEncryptedUserPassword = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!G.isString(user?.password)) {
    return null;
  }
  return user.password;
};

const userRepository = {
  getUserById,
  getUserByEmail,
  getEncryptedUserPassword,
};

export default userRepository;
