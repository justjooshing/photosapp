import { Platform } from "react-native";

const emulatorURL = `192.168.1.117`;
const webURL = "localhost";
const platformUrl = Platform.select({
  android: emulatorURL,
  default: webURL,
});

export const baseURL = `http://${platformUrl}:8080`;

const ENDPOINT_STUBS = {
  images: "/api/images",
  login: "/api/login-link",
  albums: "/api/albums",
  count: "/api/count",
  user: "/api/user",
} as const;

type STUB_KEYS = keyof typeof ENDPOINT_STUBS;

export const ENDPOINTS = new Map<STUB_KEYS, string>();

Object.keys(ENDPOINT_STUBS).forEach((key: STUB_KEYS) => {
  ENDPOINTS.set(key, ENDPOINT_STUBS[key]);
});
