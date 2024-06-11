import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as Linking from "expo-linking";
import { Slot, useGlobalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { RootSiblingParent as ToastWrapper } from "react-native-root-siblings";
import "setimmediate";
import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "../tamagui.config";

import { config } from "@/config/query";
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
  const scheme = Linking.hasCustomScheme();
  console.log({ scheme });
  const [queryClient] = useState(() => new QueryClient(config(jwt)));
  const colourScheme = useColorScheme();
  // Update after checking over dark mode themes
  const theme = colourScheme === "dark" ? DefaultTheme : DefaultTheme;

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      const data = Linking.parse(url);
      console.log("Deep link data:", data);
      // Add your handling logic here
    };

    // Check if the app was opened from a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    const deepLinkingEvent = Linking.addEventListener("url", handleDeepLink);
    return () => {
      // Remove event listener on cleanup
      deepLinkingEvent.remove();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ToastWrapper>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={tamaguiConfig}>
          <ThemeProvider value={theme}>
            <Slot />
          </ThemeProvider>
        </TamaguiProvider>
      </QueryClientProvider>
    </ToastWrapper>
  );
};

export default Layout;
