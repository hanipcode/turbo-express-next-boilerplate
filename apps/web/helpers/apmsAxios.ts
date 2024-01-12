"use client";
import axios from "axios";
import { API_URL } from "../constants/appEnv";
import { getAccessToken } from "./auth";

const apmsAxios = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 5000,
});

apmsAxios.interceptors.request.use(
  (config) => {
    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = config.headers["Content-Type"]
      ? config.headers["Content-Type"]
      : "application/json";
    if (getAccessToken()) {
      config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apmsAxios.defaults.withCredentials =
  process.env.NODE_ENV === "production" ? true : false;

export default apmsAxios;
