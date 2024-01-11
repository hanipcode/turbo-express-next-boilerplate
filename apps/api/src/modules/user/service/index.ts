import { ZUser } from "@repo/validator";
import { pipe } from "@mobily/ts-belt";
import userRepository from "../repositories";
import * as loginService from "./login";

const getUserById = (id: string) =>
  pipe(id, userRepository.getUserById, ZUser.parse);

const userServices = {
  getUserById,
  ...loginService,
};

export default userServices;
