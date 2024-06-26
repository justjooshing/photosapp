import { ImageStyle, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { tokens } from "@/config/tamagui/tokens";

interface Props {
  type: "keep" | "delete";
  style: ImageStyle;
}

const SwipeConfirmation = ({ type, style }: Props) => {
  const colour = type === "keep" ? tokens.color.green : tokens.color.red;

  return (
    <Animated.View style={[styles.bar, style, { backgroundColor: colour }]} />
  );
};

export default SwipeConfirmation;

const styles = StyleSheet.create({
  bar: {
    width: 10,
    height: "100%",
    zIndex: 2,
  },
});
