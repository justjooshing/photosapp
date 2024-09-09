import {
  QueryFunctionContext,
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import {
  ApiImageUrls,
  ApiImage,
  ApiSortImage,
  ApiSingleAlbum,
  ApiCount,
  SortOptions,
} from "../types";

import { useImageContext } from "@/context/image";
import { renderToast } from "@/utils/toast";

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

interface SortImageProps {
  imageId: number;
  sorted_status: ApiImage["sorted_status"];
}
const updateSingleImage = async ({ imageId, sorted_status }: SortImageProps) =>
  await client.put<ApiSortImage>(`${ENDPOINTS.get("images")}/${imageId}`, {
    sorted_status,
  });

export const useSortImage = () => {
  const { imageType } = useImageContext();

  const queryClient = useQueryClient();
  const dataKey = Keys.images(imageType);
  return useMutation({
    mutationFn: updateSingleImage,
    onMutate: async ({ imageId }) => {
      await queryClient.cancelQueries({ queryKey: dataKey });
      const prevImages: ApiImageUrls = queryClient.getQueryData(dataKey);
      // Optimistically remove image
      queryClient.setQueryData(dataKey, (images: ApiImageUrls) =>
        images.filter(({ id }) => id !== imageId),
      );
      return { prevImages };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(dataKey, context.prevImages);
      throw err;
    },
    onSuccess: (_, { sorted_status }, context) => {
      const conjugation =
        sorted_status === SortOptions.DELETE ? "deletion" : "keeping";

      renderToast({
        type: "success",
        message: `Image marked for ${conjugation}`,
      });
      // Allow refetch if last image has been sorted successfully
      if (context.prevImages.length === 1) {
        queryClient.invalidateQueries({ queryKey: dataKey });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.count,
      });
      queryClient.invalidateQueries({
        queryKey: Keys.albums,
      });
    },
  });
};

const getSingleImage = async ({ imageId }: { imageId: number }) =>
  await client.get<ApiSortImage>(`${ENDPOINTS.get("images")}/${imageId}`);

export const useCheckImageStatus = (albumId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getSingleImage,
    onMutate: () => {
      renderToast({
        type: "info",
        message: "Checking image status against Google",
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: Keys.albumImages(albumId),
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: Keys.count });
    },
  });
};

export const useUpdateSingleAlbumImage = (albumId: string) => {
  const queryClient = useQueryClient();
  const dataKey = Keys.albumImages(albumId);
  return useMutation({
    mutationFn: updateSingleImage,
    onMutate: async ({ sorted_status, imageId }) => {
      await queryClient.cancelQueries({ queryKey: dataKey });
      const prevSingleAlbum: ApiSingleAlbum = queryClient.getQueryData(dataKey);
      queryClient.setQueryData(dataKey, (response: ApiSingleAlbum) => {
        if (!response) return;
        // Optimistically update the album with the images update sorted_status
        const updatedImages = response.images.reduce((acc, oldImage) => {
          const updatedImage =
            oldImage.id === imageId ? { ...oldImage, sorted_status } : oldImage;

          acc.push(updatedImage);
          return acc;
        }, []);

        const updatedResponse = {
          ...response,
          images: updatedImages,
        };
        return updatedResponse;
      });

      return { prevSingleAlbum };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(dataKey, context.prevSingleAlbum);
      throw err;
    },
    onSuccess: ({ data }, { imageId, sorted_status }, ctx) => {
      // Need to think about how to stop this appearing when checking against Google
      // ...separate endpoint?
      data.image.forEach((singleImage) => {
        const conjugation =
          singleImage?.sorted_status === SortOptions.KEEP
            ? "keeping"
            : "deletion";

        renderToast({
          type: "success",
          message: `Image marked for ${conjugation}`,
        });
      });

      const returnedImage = data.image[0];
      const updatedImages = ctx.prevSingleAlbum.images.map((oldImage) =>
        oldImage.id === imageId ? returnedImage : oldImage,
      );

      const updatedSingleAlbum = {
        ...ctx.prevSingleAlbum,
        images: updatedImages,
      };

      queryClient.setQueryData(dataKey, updatedSingleAlbum);

      const matchingImages = updatedSingleAlbum.images.filter(
        (img) => img.sorted_status === sorted_status,
      );
      if (
        // If all entries now match last update
        matchingImages.length === updatedSingleAlbum.images.length ||
        // OR if last update means there's now one different to the rest
        matchingImages.length === 1
      ) {
        // refresh albums list
        queryClient.invalidateQueries({ queryKey: Keys.albums });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: Keys.count });
    },
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
