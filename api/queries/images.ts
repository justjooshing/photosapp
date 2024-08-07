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

  return useQuery({
    queryKey: Keys.images(imageType),
    queryFn: getImages,
    // ensure order is kept after refetching
    select: (images) => images?.sort((a, b) => (a.id > b.id ? -1 : 1)),
    // Kick off with a refetch interval since we might still be pulling their images from Google
    refetchInterval: (query) =>
      query &&
      (query.state.data?.length > 10 ||
        query.state.dataUpdateCount > 4 ||
        query.state.error)
        ? false
        : 1000,
  });
};

interface SortImageProps {
  image: ApiImage;
  body: Partial<ApiImage>;
}
const updateSingleImage = async ({ image, body }: SortImageProps) =>
  await client.put<ApiSortImage>(
    `${ENDPOINTS.get("images")}/${image.id}`,
    body,
  );

export const useSortImage = () => {
  const { imageType } = useImageContext();

  const queryClient = useQueryClient();
  const dataKey = Keys.images(imageType);
  return useMutation({
    mutationFn: updateSingleImage,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: dataKey });
      const prevImages: ApiImageUrls = queryClient.getQueryData(dataKey);
      queryClient.setQueryData(dataKey, (images: ApiImageUrls) =>
        images.filter((old) => old.id !== data.image.id),
      );
      return { prevImages };
    },
    onError: (err, _, context) => {
      console.error(err);
      queryClient.setQueryData(dataKey, context.prevImages);
      throw err;
    },
    onSuccess: ({ data }, v, context) => {
      data.image.map(({ sorted_status }) => {
        const conjugation =
          sorted_status === SortOptions.DELETE ? "deletion" : "keeping";

        renderToast({
          type: "success",
          message: `Image marked for ${conjugation}`,
        });
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
        const updatedImages = response.images.reduce((acc, oldImage) => {
          const updatedImage =
            oldImage.id === image.id ? { ...oldImage, ...body } : oldImage;

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
      console.error(err);
      queryClient.setQueryData(dataKey, context.prevSingleAlbum);
      throw err;
    },
    onSuccess: ({ data }, requestData, ctx) => {
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
        oldImage.id === requestData.image.id ? returnedImage : oldImage,
      );

      const updatedSingleAlbum = {
        ...ctx.prevSingleAlbum,
        images: updatedImages,
      };

      queryClient.setQueryData(dataKey, updatedSingleAlbum);
      if (
        // if actually deleted
        !returnedImage ||
        // OR if all entries now match last update
        updatedSingleAlbum.images.every(
          (img) => img.sorted_status === requestData.image.sorted_status,
        ) ||
        // OR if last update means there's now one different to the rest
        updatedSingleAlbum.images.filter(
          (img) => img.sorted_status === requestData.image.sorted_status,
        ).length === 1
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
  useQuery({
    queryKey: Keys.count,
    queryFn: getCount,
  });
