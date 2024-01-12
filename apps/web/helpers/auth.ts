"use client";

import { T_User, ZUser } from "@repo/validator";

export const TOKEN_KEY = "apmsAccessToken";
export const USER_KEY = "apmsUser";
export const setAccessToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token);
export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);
export const clearAccessToken = () => localStorage.removeItem(TOKEN_KEY);

export const setUserSession = (user: T_User) =>
  localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUserSession = () =>
  !localStorage.getItem(USER_KEY)
    ? null
    : ZUser.parse(JSON.parse(localStorage.getItem(USER_KEY) as string));
export const clearUserSession = () => localStorage.removeItem(USER_KEY);
