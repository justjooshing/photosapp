import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

import { useSwipeAnimation } from "./useSwipeAnimation";

import { tokens } from "@/config/tamagui/tokens";

interface SwipeImageProps {
  instance: number;
}

const SwipeImage = ({ instance }: SwipeImageProps) => {
  const translateX = useSharedValue(0);

  const animatedStyle = useSwipeAnimation({
    translateX,
    instance,
  });

  return (
    <Animated.View style={[styles.image, animatedStyle]}>
      <AntDesign name="picture" size={144} color={tokens.color.grey1} />
    </Animated.View>
  );
};

export default SwipeImage;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
  },
});
