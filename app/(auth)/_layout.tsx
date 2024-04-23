import { Redirect, Slot } from "expo-router";
import Cookies from "js-cookie";
import { ScrollView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Header from "@/components/header";
import { HeadingProvider } from "@/context/Header";
import { ImageProvider } from "@/context/Image";

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
            <Slot />
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
