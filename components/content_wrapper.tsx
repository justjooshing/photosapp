import { ReactNode } from "react";
import { Platform, StyleSheet, View } from "react-native";

type Props = {
  children: ReactNode;
};

const ContentWrapper = ({ children }: Props) => {
  return (
    <View style={styles.appWrapper}>
      <View style={styles.contentWrapper}>{children}</View>
    </View>
  );
};

export default ContentWrapper;

const styles = StyleSheet.create({
  appWrapper: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "#ccc",
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    maxWidth: 700,
    backgroundColor: "white",
    paddingLeft: Platform.OS === "web" ? 30 : 0,
    paddingRight: Platform.OS === "web" ? 30 : 0,
  },
});
