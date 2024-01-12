import mongoose from "mongoose";
import { MONGO_URL } from "../constants/apiEnvs";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MONGODB is running"))
  .catch((err) => console.log("MONGODB error: " + err));
