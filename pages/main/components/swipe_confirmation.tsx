import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

import Icons from "@/components/icons";

interface Props {
  type: "keep" | "delete";
  offset: SharedValue<number>;
  threshold: number;
  containerWidth: number;
}

const SwipeConfirmation = ({
  type,
  offset,
  threshold,
  containerWidth,
}: Props) => {
  const initialPosition = type === "keep" ? 35 : -35;
  const iconTranslateX = useSharedValue(-initialPosition);

  useEffect(() => {
    iconTranslateX.value = withDelay(
      2000,
      withSpring(initialPosition, { duration: 5000 }),
    );
  }, [initialPosition]);

  const initialStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: iconTranslateX.value }],
  }));

  const style = useAnimatedStyle(() => {
    const positionX = interpolate(
      offset.value,
      [threshold, -threshold],
      [-containerWidth / 2, containerWidth / 2],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ translateX: positionX }],
    };
  });

  return (
    <Animated.View style={[styles.container, initialStyle]}>
      <Animated.View style={style}>
        <Icons isSelected={false} size={54} choice={type} />
      </Animated.View>
    </Animated.View>
  );
};

export default SwipeConfirmation;

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    justifyContent: "center",
    width: 10,
    alignItems: "center",
  },
});
