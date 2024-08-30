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

import { SortOptions } from "@/api/types";
import Icons from "@/components/icons";
import { tokens } from "@/config/tamagui/tokens";
import { useAppContext } from "@/context/app";

interface Props {
  type: SortOptions;
  offset: SharedValue<number>;
  threshold: number;
}

const SwipeConfirmation = ({ type, offset, threshold }: Props) => {
  const { windowWidth } = useAppContext();
  const initialPosition = type === SortOptions.KEEP ? -60 : 60;
  const iconTranslateX = useSharedValue(initialPosition);

  useEffect(() => {
    iconTranslateX.value = withDelay(
      2000,
      withSpring(-initialPosition, { duration: 5000 }),
    );
    return () => {
      iconTranslateX.value = initialPosition;
    };
  }, [initialPosition, iconTranslateX]);

  const initialStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: iconTranslateX.value }],
  }));

  const style = useAnimatedStyle(() => {
    const positionX = interpolate(
      offset.value,
      [threshold, -threshold],
      [
        (-windowWidth + initialPosition) / 2,
        (windowWidth + initialPosition) / 2,
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
          <Icons isSelected={false} size={36} choice={type} />
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
    borderRadius: 50,
    padding: tokens.space[1],
  },
});
