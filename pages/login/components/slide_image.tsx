import { AntDesign } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
  interpolate,
  SharedValue,
  withDelay,
} from "react-native-reanimated";

import { tokens } from "@/config/tamagui/tokens";

// Define a custom hook for animation
interface useSlideAnimationProps {
  translateX: SharedValue<number>;
  containerWidthRef: SharedValue<number>;
  instance: number;
}

const useSlideAnimation = ({
  translateX,
  containerWidthRef,
  instance,
}: useSlideAnimationProps) => {
  const threshold = 100;

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateX.value),
      [0, threshold],
      [1, 0.8],
    );

    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, threshold],
      [1, 0.7],
    );

    const rotate = interpolate(
      translateX.value,
      [-threshold, threshold],
      [-10, 10],
    );

    return {
      opacity,
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotate}deg` },
        { scale },
      ] as const,
    };
  });

  useEffect(() => {
    const reverse = instance % 2 === 0;
    const duration = 2000;
    const delay = 700;
    const distance = (50 + containerWidthRef.value) / 2;

    const translateXAnimation = withDelay(
      delay,
      withTiming(reverse ? distance : -distance, {
        duration,
        easing: Easing.out(Easing.exp),
      }),
    );

    translateX.value = withDelay(
      instance * ((duration + delay) / 4),
      withRepeat(translateXAnimation, -1),
    );

    return () => {
      cancelAnimation(translateX);
    };
  }, [translateX, containerWidthRef.value, instance]);

  return animatedStyle;
};

const SlideImage = ({
  instance,
  containerWidthRef,
}: {
  instance: number;
  containerWidthRef: SharedValue<number>;
}) => {
  const translateX = useSharedValue(0);

  const animatedStyle = useSlideAnimation({
    translateX,
    containerWidthRef,
    instance,
  });

  return (
    <Animated.View style={[styles.image, animatedStyle]}>
      <AntDesign name="picture" size={144} color={tokens.color.grey1} />
    </Animated.View>
  );
};

export default SlideImage;

const styles = StyleSheet.create({
  image: {
    top: 0,
    position: "absolute",
  },
});
