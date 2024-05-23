import { Slot } from "expo-router";
import { Platform, StyleSheet, View, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const Layout = () => {
  return (
    <View style={styles.layout}>
      <Slot />
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  layout: {
    display: "flex",
    padding: 20,
    alignItems: "center",
    gap: 30,
    paddingHorizontal: Platform.OS === "web" && width > 700 ? 30 : 0,
  },
});
