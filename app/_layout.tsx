import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot, useGlobalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { RootSiblingParent as ToastWrapper } from "react-native-root-siblings";
import "setimmediate";
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "../tamagui.config";

import { config } from "@/config/query";
import useDeeplink from "@/hooks/useDeeplink";
import Storage from "@/utils/storage";

if (!global.setImmediate) {
  //@ts-expect-error
  global.setImmediate = setTimeout;
}

const Layout = () => {
  const { jwt }: { jwt?: string } = useGlobalSearchParams();
  if (jwt) {
    Storage.set("jwt", jwt);
  }
  useDeeplink();
  const queryClient = new QueryClient(config(jwt));
  const colourScheme = useColorScheme();
  // Update after checking over dark mode themes
  const theme = colourScheme === "dark" ? DefaultTheme : DefaultTheme;

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ToastWrapper>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={tamaguiConfig}>
          <ThemeProvider value={theme}>
            <SafeAreaProvider>
              <SafeAreaInsetsContext.Consumer>
                {(insets) => (
                  <View style={[{ paddingTop: insets.top }, styles.flex]}>
                    <Slot />
                  </View>
                )}
              </SafeAreaInsetsContext.Consumer>
            </SafeAreaProvider>
          </ThemeProvider>
        </TamaguiProvider>
      </QueryClientProvider>
    </ToastWrapper>
  );
};

export default Layout;

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
