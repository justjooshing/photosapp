import { ImageStyle, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

interface Props {
  type: "keep" | "delete";
  style: ImageStyle;
}

const SwipeConfirmation = ({ type, style }: Props) => {
  const colour =
    type === "keep" ? "hsla(122, 100%, 50%, .8)" : "hsla(0, 100%, 50%, .8)";

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
