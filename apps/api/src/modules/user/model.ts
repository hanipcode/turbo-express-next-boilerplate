import mongoose from "mongoose";
import { ROLES_KEY } from "@repo/validator";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  role: {
    type: String,
    enum: ROLES_KEY,
  },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
