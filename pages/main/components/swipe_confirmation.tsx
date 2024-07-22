import { LinearGradient } from "expo-linear-gradient";
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
import { tokens } from "@/config/tamagui/tokens";

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
  const initialPosition = type === "keep" ? -60 : 60;
  const iconTranslateX = useSharedValue(initialPosition);

  useEffect(() => {
    iconTranslateX.value = withDelay(
      2000,
      withSpring(-initialPosition, { duration: 5000 }),
    );
  }, [initialPosition, iconTranslateX]);

  const initialStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: iconTranslateX.value }],
  }));

  const style = useAnimatedStyle(() => {
    const positionX = interpolate(
      offset.value,
      [threshold, -threshold],
      [
        (-containerWidth + initialPosition) / 2,
        (containerWidth + initialPosition) / 2,
      ],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ translateX: positionX }],
    };
  });

  return (
    <Animated.View style={[styles.container, initialStyle]}>
      <Animated.View style={style}>
        <LinearGradient
          style={styles.icon}
          colors={[tokens.color.grey1, tokens.color.grey4]}
        >
          <Icons isSelected={false} size={56} choice={type} />
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
};

export default SwipeConfirmation;

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    justifyContent: "center",
    width: 100,
    height: 100,
    alignItems: "center",
  },
  icon: {
    borderColor: tokens.color.grey4,
    borderWidth: 3,
    padding: tokens.space[1],
  },
});
