import {
  QueryFunctionContext,
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import {
  ApiImageUrls,
  ApiImage,
  ApiSortImage,
  ApiSingleAlbum,
  ApiCount,
} from "../types";

import { ImagesType } from "@/context/header/types";
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

export const useGetImages = (imageType: ImagesType) =>
  useQuery({
    queryKey: Keys.images(imageType),
    queryFn: getImages,
    select: ({ imageUrls }) => imageUrls,
    // Kick off with a refetch interval since we're still pulling their images from Google
    refetchInterval: (query) =>
      query &&
      (query.state.data?.imageUrls.length > 10 ||
        query.state.dataUpdateCount > 4)
        ? false
        : 1000,
  });

interface SortImageProps {
  image: ApiImage;
  body: Partial<ApiImage>;
}
const updateSingleImage = async ({ image, body }: SortImageProps) =>
  await client.put<ApiSortImage>(
    `${ENDPOINTS.get("images")}/${image.id}`,
    body,
  );

export const useSortImage = (imageType: ImagesType) => {
  const queryClient = useQueryClient();
  const dataKey = Keys.images(imageType);
  return useMutation({
    mutationFn: updateSingleImage,
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
      throw err;
    },
    onSuccess: ({ data }) => {
      data.image.map(({ sorted_status }) => {
        const conjugation = sorted_status === "delete" ? "deletion" : "keeping";

        renderToast({
          type: "success",
          message: `Image marked for ${conjugation}`,
        });
      });
    },
    onSettled: (d, err, v, context) => {
      queryClient.invalidateQueries({
        queryKey: Keys.count(),
      });
      queryClient.invalidateQueries({
        queryKey: Keys.baseAlbums,
      });

      // Allow refetch if last image has been sorted successfully
      if (context.prevImages.imageUrls.length === 1 && !err) {
        queryClient.invalidateQueries({ queryKey: dataKey });
      }
    },
  });
};

export const useUpdateSingleAlbumImage = (albumId: string) => {
  const queryClient = useQueryClient();
  const dataKey = Keys.albumImages(albumId);
  return useMutation({
    mutationFn: updateSingleImage,
    onMutate: async ({ body, image }) => {
      await queryClient.cancelQueries({ queryKey: dataKey });
      const prevSingleAlbum: ApiSingleAlbum = queryClient.getQueryData(dataKey);
      queryClient.setQueryData(dataKey, (response: ApiSingleAlbum) => {
        // From here we want to identify the album that we've updated
        // Update it with the new album details, and return the object
        const updatedImages = response.images.map((oldImage) => {
          return oldImage.id === image.id
            ? {
                ...oldImage,
                ...body,
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
      throw err;
    },
    onSuccess: ({ data }, v, ctx) => {
      // Need to think about how to stop this appearing when checking against Google
      // ...separate endpoint?
      data.image.map(({ sorted_status }) => {
        const conjugation = sorted_status === "delete" ? "deletion" : "keeping";

        renderToast({
          type: "success",
          message: `Image marked for ${conjugation}`,
        });
      });
      const returnedImage = data.image[0];
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

const getCount = async () => {
  const { data } = await client.get<ApiCount>(ENDPOINTS.get("count"));
  return data;
};

export const useGetCount = () =>
  useQuery({
    queryKey: Keys.count(),
    queryFn: getCount,
  });
