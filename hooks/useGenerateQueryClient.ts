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

  // Create new queryClient if jwt exists
  const hasAuthToken = Boolean(Storage.getString("jwt"));
  const queryClient = useMemo(
    () => new QueryClient(config(hasAuthToken)),
    [hasAuthToken],
  );
  return queryClient;
};

export default useGenerateQueryClient;
