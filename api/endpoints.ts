const ENDPOINT_STUBS = {
  images: "/api/images",
  count: "/api/images/count",
  login: "/api/login-link",
  albums: "/api/albums",
  user: "/api/user",
} as const;

type STUB_KEYS = keyof typeof ENDPOINT_STUBS;

export const ENDPOINTS = new Map<STUB_KEYS, string>();

Object.keys(ENDPOINT_STUBS).forEach((key: STUB_KEYS) => {
  ENDPOINTS.set(key, ENDPOINT_STUBS[key]);
});
