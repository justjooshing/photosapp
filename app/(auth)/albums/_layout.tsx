import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

import { AlbumsProvider } from "@/context/albums";

const Layout = () => {
  return (
    <AlbumsProvider>
      <View style={styles.layout}>
        <Slot />
      </View>
    </AlbumsProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 30,
    paddingTop: 10,
  },
});
