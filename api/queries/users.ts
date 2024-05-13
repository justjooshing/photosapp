import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import { ApiUser } from "../types";

const getUser = async () => {
  const { data } = await client.get<ApiUser>(ENDPOINTS.get("user"));
  return data;
};

const token = Cookies.get("jwt");

export const useGetUser = () =>
  useQuery({
    enabled: !!token,
    queryKey: Keys.user,
    queryFn: getUser,
  });
