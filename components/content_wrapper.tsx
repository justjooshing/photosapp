import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

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
    paddingLeft: 30,
    paddingRight: 30,
  },
});
