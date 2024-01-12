export const API_PORT = process.env.API_PORT || 8000;
export const ORIGINS = process.env.ORIGINS?.split(",") || ["http://localhost"];
export const SIGN_KEY = process.env.SIGN_KEY || "";
export const ENCRYPT_KEY = process.env.ENCRYPT_KEY || "";
export const MONGO_URL = process.env.MONGO_URL || "";
