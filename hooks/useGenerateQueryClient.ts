import { QueryClient } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { useMemo } from "react";

import { config } from "@/config/query";
import Storage from "@/utils/storage";

const useGenerateQueryClient = () => {
  const { jwt }: { jwt?: string } = useGlobalSearchParams();
  if (jwt) {
    Storage.set("jwt", jwt);
  }

  // Create new queryCLient if jwt exists
  const authToken = Storage.getString("jwt");
  const queryClient = useMemo(
    () => new QueryClient(config(authToken)),
    [authToken],
  );
  return queryClient;
};

export default useGenerateQueryClient;
