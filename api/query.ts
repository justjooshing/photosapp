import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ENDPOINTS } from "./endpoints";
import { IImage } from "@/context/Images/types";
import { SortOptions } from "@/helpers/Images";
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
}: QueryFunctionContext<ReturnType<(typeof Keys)["images"]>>): Promise<{
  imageUrls: IImage[];
}> => {
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
  });

const postImage = async (data: { image: IImage; choice: SortOptions }) =>
  await client.post(ENDPOINTS.get("images"), data);

export const useMutateImages = (type: ImagesType) => {
  const queryClient = useQueryClient();
  const dataKey = Keys.images(type);
  return useMutation({
    mutationFn: postImage,
    mutationKey: Keys.sortImage,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: dataKey });
      const prevImages = queryClient.getQueryData(dataKey);
      queryClient.setQueryData(
        dataKey,
        ({ imageUrls }: { imageUrls: IImage[] }) => ({
          imageUrls: imageUrls.filter((old) => old.id !== data.image.id),
        })
      );
      return { prevImages };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(dataKey, context.prevImages);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: dataKey });
    },
  });
};
