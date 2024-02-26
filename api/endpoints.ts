const baseURL = "http://localhost:8080";

const ENDPOINT_STUBS = {
  images: "/api/images",
  login: "/api/login-link",
} as const;

export const ENDPOINTS = new Map<keyof typeof ENDPOINT_STUBS, string>();

Object.keys(ENDPOINT_STUBS).forEach((key: keyof typeof ENDPOINT_STUBS) => {
  ENDPOINTS.set(key, "");
});

ENDPOINTS.forEach((_, key) => {
  ENDPOINTS.set(key, `${baseURL}${ENDPOINT_STUBS[key]}`);
});
