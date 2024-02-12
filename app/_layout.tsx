import { AuthProvider, useAuthContext } from "@/context/Auth";
import { Slot, router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
const Layout = () => {
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    router.replace(isLoggedIn ? "/images" : "/login");
  }, [isLoggedIn]);

  return (
    <AuthProvider>
      <View className="flex-1 items-center justify-center">
        <Slot />
      </View>
    </AuthProvider>
  );
};

export default Layout;
