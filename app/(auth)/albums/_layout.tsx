import { Slot } from "expo-router";

import { AlbumsProvider } from "@/context/albums";

const Layout = () => {
  return (
    <AlbumsProvider>
      <Slot />
    </AlbumsProvider>
  );
};

export default Layout;
