import { Redirect, Slot } from "expo-router";
import Cookies from "js-cookie";
import { ScrollView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Header from "@/components/header";
import { HeadingProvider } from "@/context/header";
import { ImageProvider } from "@/context/image";

const Layout = () => {
  const jwt = Cookies.get("jwt");

  return !jwt ? (
    <Redirect href="/login" />
  ) : (
    <HeadingProvider>
      <ImageProvider>
        <Header />
        <ScrollView contentContainerStyle={styles.flex}>
          <GestureHandlerRootView style={styles.flex}>
            <View style={{ alignItems: "center", height: "100%" }}>
              <View style={{ width: "100%", height: "100%", maxWidth: 700 }}>
                <Slot />
              </View>
            </View>
          </GestureHandlerRootView>
        </ScrollView>
      </ImageProvider>
    </HeadingProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
