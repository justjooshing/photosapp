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

const token = Cookies.get("jwt");

const Keys = {
  loginLink: "login-link" as const,
  images: (type: "today" | "similar") => ["images", type] as const,
  sortImage: "sort-image" as const,
};

const getLoginLink = async () => {
  const { data } = await client.get(ENDPOINTS.get("login"));
  return data;
};

export const useGetLoginLink = () =>
  useQuery({
    queryKey: [Keys.loginLink],
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

export const useGetImages = (type: "today" | "similar") =>
  useQuery({
    enabled: !!token,
    queryKey: Keys.images(type),
    queryFn: getImages,
    select: ({ imageUrls }) => imageUrls,
  });

const postImage = async (data: { image: IImage; choice: SortOptions }) =>
  client.post(ENDPOINTS.get("images"), data);

export const useMutateImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postImage,
    mutationKey: [Keys.sortImage],
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [Keys.images] });
      const prevImages = queryClient.getQueryData([Keys.images]);
      queryClient.setQueryData(
        [Keys.images],
        ({ imageUrls }: { imageUrls: IImage[] }) =>
          imageUrls.filter((o) => o.id !== data.image.id)
      );
      return { prevImages };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [Keys.images] });
    },
  });
};
