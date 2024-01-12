"use client";

import { T_User, ZUser } from "@repo/validator";

export const TOKEN_KEY = "apmsAccessToken";
export const USER_KEY = "apmsUser";

const getStorage = () => {
  if (process.browser) return localStorage;

  return {
    setItem: () => {
      console.warn("TRYING TO RUN LOCALSTORAGE ON SERVER");
    },
    getItem: () => {
      console.warn("TRYING TO RUN LOCALSTORAGE ON SERVER");
      return null;
    },
    removeItem: () => {
      console.warn("TRYING TO RUN LOCALSTORAGE ON SERVER");
    },
  };
};
export const setAccessToken = (token: string) =>
  getStorage()?.setItem(TOKEN_KEY, token);
export const getAccessToken = () => getStorage()?.getItem(TOKEN_KEY);
export const clearAccessToken = () => getStorage()?.removeItem(TOKEN_KEY);

export const setUserSession = (user: T_User) =>
  getStorage()?.setItem(USER_KEY, JSON.stringify(user));
export const getUserSession = () =>
  !getStorage()?.getItem(USER_KEY)
    ? null
    : ZUser.parse(JSON.parse(getStorage()?.getItem(USER_KEY) as string));
export const clearUserSession = () => getStorage()?.removeItem(USER_KEY);
