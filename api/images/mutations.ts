import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys, invalidateKeys } from "../keys";
import {
  ApiImage,
  ApiSortImage,
  ApiImageUrls,
  SortOptions,
  ApiSingleAlbum,
} from "../types";

import { useImageContext } from "@/context/image";
import { renderToast } from "@/utils/toast";

interface SortImageProps {
  imageId: number;
  sorted_status: ApiImage["sorted_status"];
}
const updateSingleImage = async ({ imageId, sorted_status }: SortImageProps) =>
  client.put<ApiSortImage>(`${ENDPOINTS.get("images")}/${imageId}`, {
    sorted_status,
  });

export const useSortImage = () => {
  const { imageType } = useImageContext();

  const queryClient = useQueryClient();
  const queryKey = Keys.images(imageType);
  return useMutation({
    mutationFn: updateSingleImage,
    onMutate: async ({ imageId }) => {
      await queryClient.cancelQueries({ queryKey });
      const prevImages: ApiImageUrls = queryClient.getQueryData(queryKey);
      // Optimistically remove image
      queryClient.setQueryData(queryKey, (images: ApiImageUrls) =>
        images.filter(({ id }) => id !== imageId),
      );
      return { prevImages };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context.prevImages);
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
        queryClient.invalidateQueries({
          queryKey,
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        predicate: invalidateKeys(queryKey),
      });
    },
  });
};

const getSingleImage = async ({ imageId }: { imageId: number }) =>
  await client.get<ApiSortImage>(`${ENDPOINTS.get("images")}/${imageId}`);

export const useCheckImageStatus = (albumId: string) => {
  const queryClient = useQueryClient();
  const queryKey = Keys.albumImages(albumId);
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
        queryKey,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ predicate: invalidateKeys(queryKey) });
    },
  });
};

export const useUpdateSingleAlbumImage = (albumId: string) => {
  const queryClient = useQueryClient();
  const queryKey = Keys.albumImages(albumId);
  return useMutation({
    mutationFn: updateSingleImage,
    onMutate: async ({ sorted_status, imageId }) => {
      await queryClient.cancelQueries({ queryKey });
      const prevSingleAlbum: ApiSingleAlbum =
        queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (current: ApiSingleAlbum) => {
        // Optimistically update the album with the images update sorted_status
        const updatedImages = current.images.reduce((acc, oldImage) => {
          const updatedImage =
            oldImage.id === imageId ? { ...oldImage, sorted_status } : oldImage;

          acc.push(updatedImage);
          return acc;
        }, []);

        const updatedCurrent = {
          ...current,
          images: updatedImages,
        };
        return updatedCurrent;
      });

      return { prevSingleAlbum };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context.prevSingleAlbum);
      throw err;
    },
    onSuccess: (_, { imageId, sorted_status }, ctx) => {
      const conjugation =
        sorted_status === SortOptions.KEEP ? "keeping" : "deletion";

      renderToast({
        type: "success",
        message: `Image marked for ${conjugation}`,
      });

      const updatedImages = ctx.prevSingleAlbum.images.map((oldImage) => ({
        ...oldImage,
        sorted_status:
          oldImage.id === imageId ? sorted_status : oldImage.sorted_status,
      }));

      const updatedSingleAlbum = {
        ...ctx.prevSingleAlbum,
        images: updatedImages,
      };

      queryClient.setQueryData(queryKey, updatedSingleAlbum);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ predicate: invalidateKeys(queryKey) });
    },
  });
};
