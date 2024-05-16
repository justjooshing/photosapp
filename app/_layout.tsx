import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Slot, router, useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "../tamagui.config";

import Storage from "@/utils/storage";

const Layout = () => {
  const { jwt }: { jwt?: string } = useGlobalSearchParams();
  if (jwt) {
    Storage.set("jwt", jwt);
  }
  const token = Storage.get("jwt");

  const config: QueryClientConfig = {
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
                Storage.remove("jwt");
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
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig}>
        <ThemeProvider
          value={colourScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Slot />
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
};

export default Layout;
