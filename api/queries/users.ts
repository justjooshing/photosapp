import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import { ApiUser } from "../types";

import Storage from "@/utils/storage";

const getUser = async () => {
  const { data } = await client.get<ApiUser>(ENDPOINTS.get("user"));
  return data;
};

export const useGetUser = () =>
  useQuery({
    queryKey: Keys.user,
    queryFn: getUser,
  });

export const deleteUser = async () => {
  client.delete(ENDPOINTS.get("user"));
};

export const useDeleteUser = () => {
  const router = useRouter();

  return useMutation<void, AxiosError>({
    mutationFn: deleteUser,
    onSuccess: () => {
      Storage.delete("jwt");
      Storage.delete("rt");
      router.replace("/login");
    },
  });
};
