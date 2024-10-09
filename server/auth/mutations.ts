import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";

import Storage from "@/utils/storage";

const logout = async () => client.delete(ENDPOINTS.get("login"));

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      Storage.delete("jwt");
      queryClient.clear();
      router.replace("/login");
    },
  });
};
