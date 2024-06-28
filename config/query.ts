import {
  QueryClientConfig,
  MutationCache,
  QueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";

import Storage from "@/utils/storage";
import { renderToast } from "@/utils/toast";

const token = Storage.getString("jwt");

export const config = (jwt: string | null): QueryClientConfig => ({
  mutationCache: new MutationCache({
    onError: (err) => {
      if (err instanceof AxiosError) {
        renderToast({ type: "error", message: err.message });
      }
      return false;
    },
  }),
  defaultOptions: {
    queries: {
      enabled: !!token || !!jwt,
      staleTime: 1000 * 60 * 10,
      retry: (failureCount, err) => {
        if (err instanceof AxiosError) {
          const defaultRetry = new QueryClient().getDefaultOptions().queries
            ?.retry;

          const shouldRetry = Number.isSafeInteger(defaultRetry)
            ? failureCount < (Number(defaultRetry) ?? 0)
            : false;

          return shouldRetry;
        }
      },
      throwOnError: (err: AxiosError) => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            // Logout after half a second
            Storage.delete("jwt");
            setTimeout(() => {
              router.push("/login");
            }, 500);
          }
        }
        return false;
      },
    },
  },
});
