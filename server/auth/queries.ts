import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import { ApiLoginLink } from "../types";

import Storage from "@/utils/storage";

const getLoginLink = async () => {
  const { data } = await client.get<ApiLoginLink>(ENDPOINTS.get("login"));
  return data.loginLink;
};

export const useGetLoginLink = () =>
  useQuery<ApiLoginLink["loginLink"], AxiosError>({
    enabled: true,
    queryKey: Keys.loginLink,
    queryFn: getLoginLink,
  });

export const useGetAuthToken = () => {
  const token = Storage.getString("jwt");
  return token ? token : false;
};
