import { Redirect, Slot } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useGetAuthToken } from "@/api/queries/auth";
import Header from "@/components/header";
import { HeadingProvider } from "@/context/header";
import { ImageProvider } from "@/context/image";

const Layout = () => {
  const token = useGetAuthToken();

  return !token ? (
    <Redirect href="/login" />
  ) : (
    <HeadingProvider>
      <ImageProvider>
        <Header />
        <ScrollView contentContainerStyle={styles.flex}>
          <GestureHandlerRootView style={styles.flex}>
            <View style={styles.appWrapper}>
              <View style={styles.contentWrapper}>
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
  appWrapper: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "#ccc",
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    maxWidth: 700,
    backgroundColor: "white",
  },
});
