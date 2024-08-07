import { StyleSheet, View } from "react-native";

const Container = ({ children }) => (
  <View style={styles.wrapper}>{children}</View>
);

export default Container;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
