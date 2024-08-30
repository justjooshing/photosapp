import { useEffect } from "react";
import {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
  interpolate,
  SharedValue,
  withDelay,
} from "react-native-reanimated";

import { useAppContext } from "@/context/app";

interface useSwipeAnimationProps {
  translateX: SharedValue<number>;
  instance: number;
}

const threshold = 100;
const duration = 2000;
const delay = 700;

export const useSwipeAnimation = ({
  translateX,
  instance,
}: useSwipeAnimationProps) => {
  const { windowWidth } = useAppContext();
  const reverse = instance % 2 === 0;
  const distance = (50 + windowWidth) / 2;

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
      translateX.value = 0;
      cancelAnimation(translateX);
    };
  }, [translateX, distance, reverse, instance]);

  return animatedStyle;
};
