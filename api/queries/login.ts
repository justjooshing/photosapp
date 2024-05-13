import { useQuery } from "@tanstack/react-query";

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
    queryKey: Keys.loginLink,
    queryFn: getLoginLink,
    select: ({ loginLink }) => loginLink,
  });
