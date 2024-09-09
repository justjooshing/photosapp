import { SortOptions } from "./types";

import { ImagesType } from "@/context/image/types";

const baseKeys = {
  loginLink: "login-link",
  images: "images",
  albums: "albums",
  count: "count",
  user: "user",
};

export const Keys = {
  loginLink: [baseKeys.loginLink] as const,
  count: [baseKeys.count] as const,
  user: [baseKeys.user] as const,
  albums: [baseKeys.albums] as const,
  images: (type: ImagesType) => [baseKeys.images, type] as const,
  albumImages: (albumId: string) =>
    [baseKeys.albums, albumId, baseKeys.count] as const,
  infiniteAlbums: (sorted_status: SortOptions) =>
    [baseKeys.albums, sorted_status] as const,
};
