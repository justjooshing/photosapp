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
import { Slot, router, usePathname } from "expo-router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "../tamagui.config";

import Header from "@/components/Header";
import { HeadingProvider } from "@/context/Header";

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
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
  const pathname = usePathname();
  const jwt = Cookies.get("jwt");

  useEffect(() => {
    if (!jwt && pathname !== "/login") router.replace("/login");
    if (!!jwt && pathname === "/login") router.replace("/");
  }, [pathname, jwt]);

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig}>
        <ThemeProvider
          value={colourScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <HeadingProvider>
            <Header />
            <ScrollView contentContainerStyle={[styles.flex, styles.container]}>
              <GestureHandlerRootView style={styles.flex}>
                <Slot />
              </GestureHandlerRootView>
            </ScrollView>
          </HeadingProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    paddingTop: 10,
  },
});
