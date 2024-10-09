import { useQuery } from "@tanstack/react-query";

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
