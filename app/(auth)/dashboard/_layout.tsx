import { Slot } from "expo-router";
import { StyleSheet, ScrollView } from "react-native";

const Layout = () => (
  <ScrollView contentContainerStyle={styles.layout}>
    <Slot />
  </ScrollView>
);

export default Layout;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    minHeight: "100%",
    padding: 20,
  },
});
