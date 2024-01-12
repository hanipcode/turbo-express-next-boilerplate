import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { ENCRYPT_KEY, SIGN_KEY } from "../../../constants/apiEnvs";
import {
  JWT_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_TIME,
} from "../../../constants/appConstants";
import userRepository from "../repositories";

interface SignJWTParam {
  email: string;
  role: string;
}
export const signAccessToken = (param: SignJWTParam) =>
  jwt.sign(param, SIGN_KEY, {
    expiresIn: JWT_EXPIRATION_TIME,
  });
export const signRefreshToken = (param: SignJWTParam) =>
  jwt.sign({ ...param, isRefreshToken: true }, SIGN_KEY, {
    expiresIn: JWT_REFRESH_TOKEN_TIME,
  });

export const verifyToken = (token: string) =>
  jwt.verify(token, SIGN_KEY, { complete: true });

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
