import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import { ApiLoginLink } from "../types";

import Storage from "@/utils/storage";

const getLoginLink = async () => {
  const { data } = await client.get<ApiLoginLink>(ENDPOINTS.get("login"));
  return data;
};

export const useGetLoginLink = () =>
  useQuery({
    enabled: true,
    queryKey: Keys.loginLink,
    queryFn: getLoginLink,
    select: ({ loginLink }) => loginLink,
  });

const logout = async () => client.delete(ENDPOINTS.get("login"));

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      Storage.remove("jwt");
      router.replace("/login");
    },
  });
};

export const useGetAuthToken = () => {
  const token = Storage.get("jwt");
  return token ? token : false;
};
