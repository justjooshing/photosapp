import {
  QueryClientConfig,
  MutationCache,
  QueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";

import { errorMessageLookup } from "@/server/errors";
import Storage from "@/utils/storage";
import { renderToast } from "@/utils/toast";

const token = Storage.getString("jwt");

const handleRetry = (failureCount: number, err: Error) => {
  if (err instanceof AxiosError) {
    const defaultRetry = new QueryClient().getDefaultOptions().queries?.retry;

    const shouldRetry = Number.isSafeInteger(defaultRetry)
      ? failureCount < (Number(defaultRetry) ?? 0)
      : false;

    return shouldRetry;
  }
};

const handleError = (err: AxiosError) => {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 401) {
      // Logout after half a second
      Storage.delete("jwt");
      setTimeout(() => {
        router.replace("/login");
      }, 500);
    }
  }
  return false;
};

export const config = (hasAuthToken: boolean): QueryClientConfig => ({
  mutationCache: new MutationCache({
    onError: (err: AxiosError) => {
      if (axios.isAxiosError(err)) {
        renderToast({
          type: "error",
          message: errorMessageLookup(err),
        });
      }
      return false;
    },
  }),
  defaultOptions: {
    mutations: {
      retry: handleRetry,
      throwOnError: handleError,
    },
    queries: {
      enabled: !!token || hasAuthToken,
      staleTime: 1000 * 60 * 10,
      retry: handleRetry,
      throwOnError: handleError,
    },
  },
});
