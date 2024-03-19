export const Keys = {
  loginLink: ["login-link"] as const,
  baseImages: ["images"] as const,
  images: (type: "today" | "similar") => [Keys.baseImages, type] as const,
  sortImage: ["sort-image"] as const,
};
