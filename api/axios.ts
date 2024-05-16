// request.js
import axios from "axios";
import { Platform } from "react-native";

import Storage from "@/utils/storage";

const platformUrl = Platform.select({
  android: "192.168.1.117",
  default: "localhost",
});

const baseURL =
  process.env.NODE_ENV === "development"
    ? `http://${platformUrl}:8080`
    : "https://photosappserver.fly.dev";

export const client = axios.create({
  baseURL,
});

client.interceptors.request.use((config) => {
  const token = Storage.get("jwt");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
