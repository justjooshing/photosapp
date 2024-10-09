const ENDPOINT_STUBS = {
  images: "/images",
  count: "/images/count",
  login: "/auth/login-link",
  albums: "/albums",
  user: "/user",
} as const;

type STUB_KEYS = keyof typeof ENDPOINT_STUBS;

export const ENDPOINTS = new Map<STUB_KEYS, string>();

Object.entries(ENDPOINT_STUBS).forEach(([key, path]) => {
  ENDPOINTS.set(key as STUB_KEYS, `/api${path}`);
});
