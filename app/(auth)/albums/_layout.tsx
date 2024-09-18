import { Stack } from "expo-router";

import { AlbumsProvider } from "@/context/albums";

const Layout = () => {
  return (
    <AlbumsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="[albumId]/index" />
      </Stack>
    </AlbumsProvider>
  );
};

export default Layout;
