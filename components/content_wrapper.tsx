import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { color } from "@/config/tamagui/tokens";

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
    backgroundColor: color.grey2,
  },
  contentWrapper: {
    width: "100%",
    minHeight: "100%",
    maxWidth: 700,
    backgroundColor: color.white,
  },
});
