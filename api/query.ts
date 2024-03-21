import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ENDPOINTS } from "./endpoints";
import {
  Albums,
  IImage,
  IImageUrls,
  SortOptions,
} from "@/context/Images/types";
import { client } from "./axios";
import Cookies from "js-cookie";
import { Keys } from "./keys";
import { ImagesType } from "./types";

const token = Cookies.get("jwt");

const getLoginLink = async () => {
  const { data } = await client.get(ENDPOINTS.get("login"));
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
}: QueryFunctionContext<
  ReturnType<(typeof Keys)["images"]>
>): Promise<IImageUrls> => {
  const params = new URLSearchParams();
  params.append("type", type);
  const { data } = await client.get(ENDPOINTS.get("images"), { params });
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
      const prevImages: IImageUrls = queryClient.getQueryData(dataKey);
      queryClient.setQueryData(dataKey, ({ imageUrls }: IImageUrls) => ({
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

const getAlbums = async (): Promise<Albums> => {
  const { data } = await client.get(ENDPOINTS.get("albums"));
  return data;
};

export const useGetAlbums = () =>
  useQuery({
    enabled: !!token,
    queryKey: Keys.albums(),
    queryFn: getAlbums,
    staleTime: 1000 * 60 * 60,
  });

const getCount = async (): Promise<{
  sortedCount: number;
  deletedCount: number;
}> => {
  const { data } = await client.get(ENDPOINTS.get("count"));
  return data;
};

export const useGetCount = () =>
  useQuery({
    enabled: !!token,
    queryKey: Keys.count(),
    queryFn: getCount,
    staleTime: 1000 * 60 * 60,
  });
