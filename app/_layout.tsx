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
import { Slot, router } from "expo-router";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "../tamagui.config";

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
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
              Cookies.remove("jwt");
              router.push("/login");
            }, 500);
          }
        }
        return false;
      },
    },
  },
};

const Layout = () => {
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
