import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { tokens } from "@/config/tamagui/tokens";

const Skeleton = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.3, { duration: 1000 }), -1, true);
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.size, styles.initialColour]}>
      <Animated.View
        style={[styles.size, styles.animatedColour, animatedStyles]}
      />
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  size: {
    width: "100%",
    height: "100%",
  },
  initialColour: {
    backgroundColor: tokens.color.grey1,
  },
  animatedColour: {
    backgroundColor: tokens.color.grey4,
  },
});
