import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { ENCRYPT_KEY, SIGN_KEY } from "../../../constants/apiEnvs";
import { JWT_EXPIRATION_TIME } from "../../../constants/appConstants";
import userRepository from "../repositories";

interface SignJWTParam {
  email: string;
  role: string;
}
export const signJwt = (param: SignJWTParam) =>
  jwt.sign(param, SIGN_KEY, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

export const getUserPassword = (id: string) =>
  userRepository.getEncryptedUserPassword(id);

export const decryptPassword = (inputPassword: string) =>
  CryptoJS.AES.decrypt(inputPassword, ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
export const encryptPassword = (inputPassword: string) =>
  CryptoJS.AES.encrypt(inputPassword, ENCRYPT_KEY).toString();

export const checkPassword = (
  inputPassword: string,
  encryptedPassword: string | null,
) =>
  CryptoJS.AES.decrypt(encryptedPassword as string, ENCRYPT_KEY).toString(
    CryptoJS.enc.Utf8,
  ) === inputPassword;
