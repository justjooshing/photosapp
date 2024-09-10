import { Query } from "@tanstack/react-query";

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
  loginLink: [{ base: [baseKeys.loginLink] }] as const,
  count: [{ base: [baseKeys.count] }] as const,
  user: [{ base: [baseKeys.user] }] as const,
  albums: [{ base: [baseKeys.albums] }] as const,
  images: (type: ImagesType) =>
    [
      { base: [baseKeys.images, baseKeys.count, baseKeys.albums], type },
    ] as const,
  albumImages: (albumId: string) =>
    [{ base: [baseKeys.albums, baseKeys.count], albumId }] as const,
  infiniteAlbums: (sorted_status: SortOptions) =>
    [{ base: [baseKeys.albums], sorted_status }] as const,
};

type BaseQueryKey = Readonly<{ base: Readonly<string[]> }>;

/**
 * Invalidates any cache that has overlapping base queryKeys
 */
export const invalidateKeys = <T extends Readonly<BaseQueryKey[]>>(
  currentQueryKey: T,
) => {
  const currentBaseSet = new Set(currentQueryKey[0].base);
  return (queryCache: Query<undefined, undefined, undefined, BaseQueryKey[]>) =>
    queryCache.queryKey.some((key) => {
      const cacheBaseSet = new Set(key.base);
      // Returning true will invalidate any cache with overlap baseQueryKeys
      const isInvalidated = Array.from(cacheBaseSet).some((baseKey) =>
        currentBaseSet.has(baseKey),
      );
      return isInvalidated;
    });
};
