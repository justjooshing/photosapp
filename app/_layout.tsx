import { AuthProvider, useAuthContext } from "@/context/Auth/Auth";
import { ImagesProvider } from "@/context/Images/Images";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, router } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const Layout = () => {
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    router.replace(isLoggedIn ? "/" : "/login");
  }, [isLoggedIn]);

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ImagesProvider>
          <GestureHandlerRootView style={styles.view}>
            <View style={styles.view}>
              <Slot />
            </View>
          </GestureHandlerRootView>
        </ImagesProvider>
      </AuthProvider>
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
