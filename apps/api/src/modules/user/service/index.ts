import { ZUser } from "@repo/validator";
import userRepository from "../repositories";
import * as loginService from "./login";

const getUserById = async (id: string) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    return null;
  }
  return ZUser.parse(user);
};

const getUserByEmail = async (email: string) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    return null;
  }
  return ZUser.parse(user.toObject());
};

const userServices = {
  getUserById,
  getUserByEmail,
  ...loginService,
};

export default userServices;
