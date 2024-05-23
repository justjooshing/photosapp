import { ReactNode } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";

import { color } from "@/tamagui/tokens";
const { width } = Dimensions.get("window");

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
    minHeight: "100%",
    backgroundColor: color.grey3,
  },
  contentWrapper: {
    width: "100%",
    minHeight: "100%",
    maxWidth: 700,
    backgroundColor: color.white,
    paddingHorizontal: Platform.OS === "web" && width > 700 ? 30 : 0,
  },
});
