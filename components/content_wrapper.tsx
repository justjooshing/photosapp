import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { color } from "@/tamagui/tokens";

type Props = {
  children: ReactNode;
};

const ContentWrapper = ({ children }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.appWrapper}>
      <View style={styles.contentWrapper}>{children}</View>
    </ScrollView>
  );
};

export default ContentWrapper;

const styles = StyleSheet.create({
  appWrapper: {
    alignItems: "center",
    minHeight: "100%",
    backgroundColor: color.grey2,
  },
  contentWrapper: {
    width: "100%",
    minHeight: "100%",
    maxWidth: 700,
    backgroundColor: color.white,
  },
});
