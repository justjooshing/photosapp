import { AuthProvider, useAuthContext } from "@/context/Auth";
import { Slot, router } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
const Layout = () => {
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    router.replace(isLoggedIn ? "/" : "/login");
  }, [isLoggedIn]);

  return (
    <AuthProvider>
      <View style={styles.view}>
        <Slot />
      </View>
    </AuthProvider>
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
