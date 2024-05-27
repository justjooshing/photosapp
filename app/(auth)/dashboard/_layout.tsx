import { Slot } from "expo-router";
import { StyleSheet, ScrollView } from "react-native";

const Layout = () => {
  return (
    <ScrollView contentContainerStyle={styles.layout}>
      <Slot />
    </ScrollView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  layout: {
    display: "flex",
    padding: 20,
    alignItems: "center",
    gap: 30,
  },
});
