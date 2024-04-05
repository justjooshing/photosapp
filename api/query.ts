import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Cookies from "js-cookie";

import { client } from "./axios";
import { ENDPOINTS } from "./endpoints";
import { Keys } from "./keys";
import {
  ApiAlbums,
  ApiCount,
  ApiImage,
  ApiImageUrls,
  ApiLoginLink,
  ApiSingleAlbum,
  ApiSortImage,
  ApiUser,
  SortOptions,
  imagesType,
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

export const useGetImages = () =>
  useQuery({
    enabled: !!token,
    queryKey: Keys.images(imagesType),
    queryFn: getImages,
    select: ({ imageUrls }) => imageUrls,
    staleTime: 1000 * 60 * 60,
  });

const postImage = async (data: { image: ApiImage; choice: SortOptions }) =>
  await client.post<ApiSortImage>(ENDPOINTS.get("images"), data);

export const useMutateImages = () => {
  const queryClient = useQueryClient();
  const dataKey = Keys.images(imagesType);
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

export const useUpdateSingleImage = (albumId: string) => {
  const queryClient = useQueryClient();
  const dataKey = Keys.albumImages(albumId);
  return useMutation({
    mutationFn: postImage,
    onMutate: async ({ choice, image }) => {
      await queryClient.cancelQueries({ queryKey: dataKey });
      const prevSingleAlbum: ApiSingleAlbum = queryClient.getQueryData(dataKey);
      queryClient.setQueryData(dataKey, (response: ApiSingleAlbum) => {
        // From here we want to identify the album that we've updated
        // Update it with the new choice, and return the object
        const updatedImages = response.images.map((oldImage) => {
          return oldImage.id === image.id
            ? {
                ...oldImage,
                sorted_status: choice,
              }
            : oldImage;
        });

        const updatedResponse = {
          ...response,
          images: updatedImages,
        };
        return updatedResponse;
      });

      return { prevSingleAlbum };
    },
    onError: (err, _, context) => {
      console.error(err);
      queryClient.setQueryData(dataKey, context.prevSingleAlbum);
    },
    onSuccess: (response, v, ctx) => {
      const returnedImage = response.data.image[0];
      const updatedImages = ctx.prevSingleAlbum.images.map((oldImage) =>
        oldImage.id === returnedImage.id ? returnedImage : oldImage,
      );
      const updatedSingleAlbum = {
        ...ctx.prevSingleAlbum,
        images: updatedImages,
      };

      queryClient.setQueryData(dataKey, updatedSingleAlbum);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: Keys.count() });
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
    staleTime: 1000 * 60 * 60,
  });
};
