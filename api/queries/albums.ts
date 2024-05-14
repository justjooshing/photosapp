import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import { ApiAlbums, ApiSingleAlbum } from "../types";

const token = Cookies.get("jwt");

const getAlbums = async () => {
  const { data } = await client.get<ApiAlbums>(ENDPOINTS.get("albums"));
  return data;
};

export const useGetAlbums = () =>
  useQuery({
    queryKey: Keys.albums(),
    queryFn: getAlbums,
  });

const getSingleAlbum = async ({
  queryKey: [, albumId],
}: QueryFunctionContext<ReturnType<(typeof Keys)["albumImages"]>>) => {
  const { data } = await client.get<ApiSingleAlbum>(
    `${ENDPOINTS.get("albums")}/${albumId}`,
  );
  return data;
};

export const useGetSingleAlbum = (albumId: string) => {
  const isNumberAsString = !isNaN(+albumId) && !Array.isArray(albumId);

  return useQuery({
    enabled: !!token && isNumberAsString,
    queryKey: Keys.albumImages(albumId),
    queryFn: getSingleAlbum,
    refetchOnWindowFocus: "always",
  });
};
