import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

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
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 30,
    paddingTop: 10,
  },
});
