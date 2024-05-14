import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Cookies from "js-cookie";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import { ApiUser } from "../types";

const getUser = async () => {
  const { data } = await client.get<ApiUser>(ENDPOINTS.get("user"));
  return data;
};

export const useGetUser = () =>
  useQuery({
    queryKey: Keys.user,
    queryFn: getUser,
  });

export const deleteUser = async () => client.delete(ENDPOINTS.get("user"));

export const useDeleteUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      Cookies.remove("jwt");
      router.replace("/");
    },
  });
};
