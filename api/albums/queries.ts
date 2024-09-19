import {
  useQuery,
  QueryFunctionContext,
  useInfiniteQuery,
  InfiniteData,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import { ApiAlbums, ApiSingleAlbum, SortOptions } from "../types";

import {
  FilterOptionsType,
  useSingleAlbumContext,
} from "@/context/single_album";
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
  useInfiniteQuery<
    ApiAlbums,
    AxiosError,
    InfiniteData<ApiAlbums>,
    ReturnType<typeof Keys.infiniteAlbums>
  >({
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

const selectImages = (filter: FilterOptionsType) => (data: ApiSingleAlbum) => {
  const images =
    filter === "all"
      ? data.images
      : data?.images.filter(({ sorted_status }) => sorted_status === filter);

  return {
    ...data,
    images,
  };
};
export const useGetSingleAlbum = () => {
  const { filter, albumId } = useSingleAlbumContext();

  const token = Storage.getString("jwt");
  const isNumberAsString = !isNaN(+albumId) && !Array.isArray(albumId);

  return useQuery<ApiSingleAlbum, AxiosError>({
    enabled: !!token && isNumberAsString && !!albumId,
    queryKey: Keys.albumImages(albumId),
    queryFn: getSingleAlbum,
    select: selectImages(filter),
  });
};
