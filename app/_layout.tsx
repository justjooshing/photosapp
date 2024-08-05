import { ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot, SplashScreen } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootSiblingParent as ToastWrapper } from "react-native-root-siblings";
import "setimmediate";
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "../tamagui.config";

import { tokens } from "@/config/tamagui/tokens";
import { AppProvider } from "@/context/app";
import useDeeplink from "@/hooks/useDeeplink";
import useFonts from "@/hooks/useFonts";
import useGenerateQueryClient from "@/hooks/useGenerateQueryClient";
import useTheme from "@/hooks/useTheme";

if (!global.setImmediate) {
  //@ts-expect-error
  global.setImmediate = setTimeout;
}

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  useDeeplink();
  const queryClient = useGenerateQueryClient();
  const loaded = useFonts();
  const theme = useTheme();

  if (!loaded) {
    return null;
  }

  return (
    <ToastWrapper>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={tamaguiConfig}>
          <ThemeProvider value={theme}>
            <AppProvider>
              <SafeAreaProvider>
                <SafeAreaInsetsContext.Consumer>
                  {(insets) => (
                    <View
                      style={[
                        {
                          paddingTop: insets.top,
                          backgroundColor: tokens.color.blue2,
                        },
                        styles.flex,
                      ]}
                    >
                      <Slot />
                    </View>
                  )}
                </SafeAreaInsetsContext.Consumer>
              </SafeAreaProvider>
            </AppProvider>
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
