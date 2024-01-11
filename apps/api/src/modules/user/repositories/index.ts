import UserModel from "../model";

const getUserById = (id: string) => UserModel.findById(id);
const getUserByEmail = (email: string) =>
  UserModel.findOne({
    email,
  });

const userRepository = {
  getUserById,
  getUserByEmail,
};

export default userRepository;
