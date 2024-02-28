import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ENDPOINTS } from "./endpoints";
import { IImage } from "@/context/Images/types";
import { SortOptions } from "@/helpers/Images";

enum Keys {
  loginLink = "login-link",
  images = "images",
  sortImage = "sort-image",
}

const getData = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (e) {
    throw new Error(`failed when fetching ${url}`);
  }
};

const getLoginLink = async () => getData(ENDPOINTS.get("login"));

export const useGetLoginLink = () =>
  useQuery({
    queryKey: [Keys.loginLink],
    queryFn: getLoginLink,
    select: ({ loginLink }) => loginLink,
  });

const getImages = async (): Promise<{ imageUrls: IImage[] }> =>
  getData(ENDPOINTS.get("images"));

export const useGetImages = () =>
  useQuery({
    queryKey: [Keys.images],
    queryFn: getImages,
    select: ({ imageUrls }) => imageUrls,
  });

const postImage = async (data: { image: IImage; choice: SortOptions }) =>
  axios.post(ENDPOINTS.get("images"), data);

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
