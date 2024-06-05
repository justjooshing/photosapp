import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import { ApiAlbums, ApiSingleAlbum } from "../types";

import Storage from "@/utils/storage";

const getAlbums = async () => {
  const { data } = await client.get<ApiAlbums>(ENDPOINTS.get("albums"));
  return data;
};

const organiseAlbums = ({
  albums,
}: ApiAlbums): {
  withDeletedCount: ApiAlbums["albums"];
  noDeletedCount: ApiAlbums["albums"];
  albums: ApiAlbums["albums"];
} => {
  const { withDeletedCount, noDeletedCount } = albums.reduce(
    (acc, album) => {
      if (album.deleteCount) {
        acc.withDeletedCount.push(album);
      } else {
        acc.noDeletedCount.push(album);
      }
      return acc;
    },
    { withDeletedCount: [], noDeletedCount: [] },
  );
  return { withDeletedCount, noDeletedCount, albums };
};

export const useGetAlbums = () =>
  useQuery({
    queryKey: Keys.albums,
    queryFn: getAlbums,
    select: organiseAlbums,
  });

const getSingleAlbum = async ({
  queryKey: [, albumId],
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
      if (curr.sorted_status === "delete") {
        acc.deleted.push(curr);
      } else {
        acc.kept.push(curr);
      }
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

export const useGetSingleAlbum = (albumId: string) => {
  const token = Storage.getString("jwt");
  const isNumberAsString = !isNaN(+albumId) && !Array.isArray(albumId);

  return useQuery({
    enabled: !!token && isNumberAsString && !!albumId,
    queryKey: Keys.albumImages(albumId),
    queryFn: getSingleAlbum,
    select: organiseSingleAlbum,
  });
};
