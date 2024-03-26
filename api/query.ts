import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ENDPOINTS } from "./endpoints";
import { IImage, SortOptions } from "@/context/Images/types";
import { client } from "./axios";
import Cookies from "js-cookie";
import { Keys } from "./keys";
import {
  ApiAlbums,
  ApiCount,
  ApiImageUrls,
  ApiLoginLink,
  ApiSingleAlbum,
  ApiUser,
  ImagesType,
} from "./types";

const token = Cookies.get("jwt");

const getLoginLink = async () => {
  const { data } = await client.get<ApiLoginLink>(ENDPOINTS.get("login"));
  return data;
};

export const useGetLoginLink = () =>
  useQuery({
    queryKey: Keys.loginLink,
    queryFn: getLoginLink,
    select: ({ loginLink }) => loginLink,
  });

const getImages = async ({
  queryKey: [, type],
}: QueryFunctionContext<ReturnType<(typeof Keys)["images"]>>) => {
  const params = new URLSearchParams();
  params.append("type", type);
  const { data } = await client.get<ApiImageUrls>(ENDPOINTS.get("images"), {
    params,
  });
  return data;
};

export const useGetImages = (type: ImagesType) =>
  useQuery({
    enabled: !!token,
    queryKey: Keys.images(type),
    queryFn: getImages,
    select: ({ imageUrls }) => imageUrls,
    staleTime: 1000 * 60 * 60,
  });

const postImage = async (data: { image: IImage; choice: SortOptions }) =>
  await client.post(ENDPOINTS.get("images"), data);

export const useMutateImages = (type: ImagesType) => {
  const queryClient = useQueryClient();
  const dataKey = Keys.images(type);
  return useMutation({
    mutationFn: postImage,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: dataKey });
      const prevImages: ApiImageUrls = queryClient.getQueryData(dataKey);
      queryClient.setQueryData(dataKey, ({ imageUrls }: ApiImageUrls) => ({
        imageUrls: imageUrls.filter((old) => old.id !== data.image.id),
      }));
      return { prevImages };
    },
    onError: (err, _, context) => {
      console.error(err);
      queryClient.setQueryData(dataKey, context.prevImages);
    },
    onSettled: (d, err, v, context) => {
      queryClient.invalidateQueries({ queryKey: Keys.count() });
      // Allow refetch if last image has been sorted successfully
      if (context.prevImages.imageUrls.length === 1 && !err) {
        queryClient.invalidateQueries({ queryKey: dataKey });
      }
    },
  });
};

const getAlbums = async () => {
  const { data } = await client.get<ApiAlbums>(ENDPOINTS.get("albums"));
  return data;
};

export const useGetAlbums = () =>
  useQuery({
    enabled: !!token,
    queryKey: Keys.albums(),
    queryFn: getAlbums,
    staleTime: 1000 * 60 * 60,
  });

const getCount = async () => {
  const { data } = await client.get<ApiCount>(ENDPOINTS.get("count"));
  return data;
};

export const useGetCount = () =>
  useQuery({
    enabled: !!token,
    queryKey: Keys.count(),
    queryFn: getCount,
    staleTime: 1000 * 60 * 60,
  });

const getUser = async () => {
  const { data } = await client.get<ApiUser>(ENDPOINTS.get("user"));
  return data;
};
export const useGetUser = () =>
  useQuery({
    enabled: !!token,
    queryKey: Keys.user,
    queryFn: getUser,
    staleTime: 1000 * 60 * 60,
  });

const getSingleAlbum = async ({
  queryKey: [, albumId],
}: QueryFunctionContext<ReturnType<(typeof Keys)["albumImages"]>>) => {
  const { data } = await client.get<ApiSingleAlbum>(
    `${ENDPOINTS.get("albums")}/${albumId}`
  );
  return data;
};

export const useGetSingleAlbum = (albumId: string) =>
  useQuery({
    enabled: !!token,
    queryKey: Keys.albumImages(albumId),
    queryFn: getSingleAlbum,
    staleTime: 1000 * 60 * 60,
  });
