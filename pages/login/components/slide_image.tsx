import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
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
    <View style={styles.image}>
      <LinearGradient
        style={styles.icon}
        colors={[tokens.color.grey1, tokens.color.grey4]}
      >
        <AntDesign name="delete" size={24} color={tokens.color.red2} />
      </LinearGradient>
      <Animated.View style={animatedStyle}>
        <AntDesign name="picture" size={144} color={tokens.color.grey1} />
      </Animated.View>
      <LinearGradient
        style={styles.icon}
        colors={[tokens.color.grey1, tokens.color.grey4]}
      >
        <AntDesign name="folder1" size={24} color={tokens.color.green} />
      </LinearGradient>
    </View>
  );
};

export default SlideImage;

const styles = StyleSheet.create({
  image: {
    top: 0,
    position: "absolute",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  icon: {
    backgroundColor: tokens.color.grey2,
    padding: tokens.space[1],
    borderRadius: 50,
  },
});
