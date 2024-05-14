import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Cookies from "js-cookie";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import { ApiLoginLink } from "../types";

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
      Cookies.remove("jwt");
      router.replace("/");
    },
  });
};
