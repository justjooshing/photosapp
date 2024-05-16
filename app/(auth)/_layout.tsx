import { Redirect, Slot } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useGetAuthToken } from "@/api/queries/auth";
import ContentWrapper from "@/components/content_wrapper";
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
            <ContentWrapper>
              <Slot />
            </ContentWrapper>
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
