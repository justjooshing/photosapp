// request.js
import axios from "axios";
import Cookies from "js-cookie";
import { Platform } from "react-native";

const platformUrl = Platform.select({
  android: "192.168.1.117",
  default: "localhost",
});

const baseURL =
  process.env.NODE_ENV === "development"
    ? `http://${platformUrl}:8080`
    : "https://photosappserver.fly.dev";

const token = Cookies.get("jwt");
export const client = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` },
});
