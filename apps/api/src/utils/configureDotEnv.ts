import fs from "fs";
import path from "path";
import dotenv from "dotenv";

if (fs.existsSync(path.join(__dirname, "../../../.env"))) {
  dotenv.config({ path: path.join(__dirname, "../../../.env") });
}
