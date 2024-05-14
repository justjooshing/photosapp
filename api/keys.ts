import { ImagesType } from "@/context/_header/types";

export const Keys = {
  loginLink: ["login-link"] as const,
  baseImages: ["images"] as const,
  baseAlbums: ["albums"],
  // Need to add userId to these
  images: (type: ImagesType) => [...Keys.baseImages, type] as const,
  albums: () => [...Keys.baseAlbums] as const,
  albumImages: (albumId: string) => [...Keys.albums(), albumId] as const,
  count: () => ["count"] as const,
  user: ["user"] as const,
};
