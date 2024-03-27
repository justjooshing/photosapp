import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Slot, router, usePathname } from "expo-router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

  const pathname = usePathname();
  const jwt = Cookies.get("jwt");

  useEffect(() => {
    if (!jwt && pathname !== "/login") router.replace("/login");
    if (!!jwt && pathname === "/login") router.replace("/");
  }, [pathname, jwt]);

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollView>
        <GestureHandlerRootView style={styles.view}>
          <Slot />
        </GestureHandlerRootView>
      </ScrollView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default Layout;
