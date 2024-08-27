import axios from "axios";
import { nativeBuildVersion } from "expo-application";
import { Platform } from "react-native";

import Storage from "@/utils/storage";
import { renderToast } from "@/utils/toast";

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

client.interceptors.response.use(
  (res) => {
    const token = res.headers["jwt"];
    if (token) {
      Storage.set("jwt", token);
    }
    return res;
  },
  (err) => {
    if (err.code === "ERR_NETWORK") {
      renderToast({ type: "error", message: "Cannot connect to the network" });
    }
    throw err;
  },
);

client.interceptors.request.use((config) => {
  const token = Storage.getString("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
