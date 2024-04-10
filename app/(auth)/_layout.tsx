import { Redirect, Slot } from "expo-router";
import Cookies from "js-cookie";
import { ScrollView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Header from "@/components/header";
import { HeadingProvider } from "@/context/Header";

const Layout = () => {
  const jwt = Cookies.get("jwt");

  return !jwt ? (
    <Redirect href="/login" />
  ) : (
    <HeadingProvider>
      <Header />
      <ScrollView contentContainerStyle={[styles.flex, styles.container]}>
        <GestureHandlerRootView style={styles.flex}>
          <Slot />
        </GestureHandlerRootView>
      </ScrollView>
    </HeadingProvider>
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
