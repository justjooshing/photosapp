import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  MutationCache,
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Slot, router, useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import { useColorScheme } from "react-native";
import { RootSiblingParent as ToastWrapper } from "react-native-root-siblings";
import "setimmediate";
import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "../tamagui.config";

import Storage from "@/utils/storage";
import { renderToast } from "@/utils/toast";

if (!global.setImmediate) {
  //@ts-expect-error
  global.setImmediate = setTimeout;
}

const Layout = () => {
  const { jwt }: { jwt?: string } = useGlobalSearchParams();
  if (jwt) {
    Storage.set("jwt", jwt);
  }
  const token = Storage.getString("jwt");

  const config: QueryClientConfig = {
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
            if (err.response?.status === 401) {
              return false;
            }

            const defaultRetry = new QueryClient().getDefaultOptions().queries
              ?.retry;

            return Number.isSafeInteger(defaultRetry)
              ? failureCount < (Number(defaultRetry) ?? 0)
              : false;
          }
        },
        throwOnError: (err: AxiosError) => {
          if (err instanceof AxiosError) {
            if (err.response?.status === 401) {
              // Logout after half a second
              setTimeout(() => {
                Storage.delete("jwt");
                router.push("/login");
              }, 500);
            }
          }
          return false;
        },
      },
    },
  };

  const [queryClient] = useState(() => new QueryClient(config));
  const colourScheme = useColorScheme();
  const theme = colourScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <ToastWrapper>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={tamaguiConfig}>
          <ThemeProvider value={theme}>
            <Slot />
          </ThemeProvider>
        </TamaguiProvider>
      </QueryClientProvider>
    </ToastWrapper>
  );
};

export default Layout;
