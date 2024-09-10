import {
  useQuery,
  QueryFunctionContext,
  useInfiniteQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import { ApiAlbums, ApiSingleAlbum, SortOptions } from "../types";

import Storage from "@/utils/storage";

const getInfiniteAlbums = async ({
  pageParam,
  queryKey: [{ sorted_status }],
}: QueryFunctionContext<ReturnType<(typeof Keys)["infiniteAlbums"]>>) => {
  const params = { lastAlbumId: pageParam, sorted_status };
  const { data } = await client.get<ApiAlbums>(ENDPOINTS.get("albums"), {
    params,
  });
  return data;
};

export const useGetInfiniteAlbums = (sorted_status: SortOptions) =>
  useInfiniteQuery({
    queryKey: Keys.infiniteAlbums(sorted_status),
    queryFn: getInfiniteAlbums,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.albums.at(-1)?.id,
  });

const getSingleAlbum = async ({
  queryKey: [{ albumId }],
}: QueryFunctionContext<ReturnType<(typeof Keys)["albumImages"]>>) => {
  const { data } = await client.get<ApiSingleAlbum>(
    `${ENDPOINTS.get("albums")}/${albumId}`,
  );
  return data;
};

const organiseSingleAlbum = (data: ApiSingleAlbum) => {
  const organisedImages = data.images.reduce(
    (
      acc: {
        deleted: ApiSingleAlbum["images"];
        kept: ApiSingleAlbum["images"];
      },
      curr,
    ) => {
      // Something to do with optimistic updates or refetching causing curr to be undefined natively
      if (!curr) {
        return acc;
      }
      const sortBy =
        curr.sorted_status === SortOptions.DELETE ? "deleted" : "kept";
      acc[sortBy].push(curr);
      return acc;
    },
    { deleted: [], kept: [] },
  );
  const organisedSingleAlbum = {
    ...data,
    ...organisedImages,
  };
  return organisedSingleAlbum;
};

export const useGetSingleAlbum = (
  albumId: string,
): UseQueryResult<
  ApiSingleAlbum & {
    deleted: ApiSingleAlbum["images"];
    kept: ApiSingleAlbum["images"];
  },
  AxiosError
> => {
  const token = Storage.getString("jwt");
  const isNumberAsString = !isNaN(+albumId) && !Array.isArray(albumId);

  return useQuery({
    enabled: !!token && isNumberAsString && !!albumId,
    queryKey: Keys.albumImages(albumId),
    queryFn: getSingleAlbum,
    select: organiseSingleAlbum,
  });
};
