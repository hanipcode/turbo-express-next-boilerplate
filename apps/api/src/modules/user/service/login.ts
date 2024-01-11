import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { ENCRYPT_KEY, SIGN_KEY } from "../../../constants/apiEnvs";
import { JWT_EXPIRATION_TIME } from "../../../constants/appConstants";

interface SignJWTParam {
  email: string;
  role: string;
}
export const signJwt = (param: SignJWTParam) =>
  jwt.sign(param, SIGN_KEY, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

export const checkPassword = (
  inputPassword: string,
  encryptedPassword: string,
) =>
  CryptoJS.AES.encrypt(inputPassword, ENCRYPT_KEY).toString() ===
  encryptedPassword;
