const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

if (fs.existsSync(path.join(__dirname, "../../.env"))) {
  dotenv.config({ path: path.join(__dirname, "../../.env") });
}

/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};
