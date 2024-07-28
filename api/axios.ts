import axios from "axios";
import { nativeBuildVersion } from "expo-application";
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
  headers: {
    "app-version": Platform.OS === "web" ? "web" : nativeBuildVersion,
  },
});

client.interceptors.response.use((res) => {
  // @ts-expect-error - says we can't call .get()
  const token = res.headers.get("Jwt");
  if (token) {
    Storage.set("jwt", token);
  }
  return res;
});

client.interceptors.request.use((config) => {
  const token = Storage.getString("jwt");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
