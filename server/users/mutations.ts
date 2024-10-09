import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import { useRouter } from "expo-router";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";

import Storage from "@/utils/storage";

export const deleteUser = async () => client.delete(ENDPOINTS.get("user"));

export const useDeleteUser = () => {
  const router = useRouter();

  return useMutation<AxiosResponse<void>, AxiosError>({
    mutationFn: deleteUser,
    onSuccess: () => {
      Storage.delete("jwt");
      router.replace("/login");
    },
  });
};
