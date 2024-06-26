import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { tokens } from "@/config/tamagui/tokens";

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
    flex: 1,
    alignItems: "center",
    backgroundColor: tokens.color.grey2,
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
    maxWidth: 700,
    backgroundColor: tokens.color.white,
  },
});
