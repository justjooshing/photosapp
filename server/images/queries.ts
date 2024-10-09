import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import { ApiImageUrls, ApiCount } from "../types";

import { useImageContext } from "@/context/image";

const getImages = async ({
  queryKey: [{ type }],
}: QueryFunctionContext<ReturnType<(typeof Keys)["images"]>>) => {
  const params = new URLSearchParams();
  params.append("type", type);
  const { data } = await client.get<ApiImageUrls>(ENDPOINTS.get("images"), {
    params,
  });
  return data;
};

export const useGetImages = () => {
  const { imageType } = useImageContext();

  return useQuery<ApiImageUrls, AxiosError>({
    queryKey: Keys.images(imageType),
    queryFn: getImages,
    // ensure order is kept after refetching
    select: (images) => images?.sort((a, b) => (a.id > b.id ? -1 : 1)),
    // Kick off with multiple refetches since we might still be pulling their images from Google
    refetchInterval: (query) =>
      query?.state.data?.length ||
      query?.state.dataUpdateCount > 4 ||
      query?.state.error
        ? false
        : 1,
  });
};

const getCount = async () => {
  const { data } = await client.get<ApiCount>(ENDPOINTS.get("count"));
  return data;
};

export const useGetCount = () =>
  useQuery<ApiCount, AxiosError>({
    queryKey: Keys.count,
    queryFn: getCount,
  });
