import { ImagesProvider } from "@/context/Images/Images";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Slot, router, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Cookies from "js-cookie";

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: (failureCount, err) => {
        if (err instanceof AxiosError) {
          if (err.response.status === 401) {
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
        if (err.response.status === 401) {
          Cookies.remove("jwt");
          router.push("/login");
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

  console.log(queryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <ImagesProvider>
        <GestureHandlerRootView style={styles.view}>
          <View style={styles.view}>
            <Slot />
          </View>
        </GestureHandlerRootView>
      </ImagesProvider>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Layout;
