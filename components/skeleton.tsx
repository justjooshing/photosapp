import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { color } from "@/config/tamagui/tokens";

const Skeleton = () => {
  const [offsetWidth, setOffsetWidth] = useState(180);
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  useEffect(() => {
    offset.value = withRepeat(withTiming(offsetWidth, { duration: 1500 }), -1);
    return () => {
      offset.value = -150;
    };
  }, [offsetWidth]);

  return (
    <View
      style={styles.box}
      onLayout={({ nativeEvent }) => {
        setOffsetWidth(nativeEvent.layout.width);
      }}
    >
      <Animated.View style={[styles.shimmer, animatedStyles]}>
        <View style={styles.bar} />
      </Animated.View>
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: "100%",
    backgroundColor: color.grey2,
    justifyContent: "center",
    overflow: "hidden",
  },
  shimmer: {
    height: "110%",
  },
  bar: {
    transform: "rotate(5deg)",
    height: "100%",
    shadowOffset: { height: 0, width: -30 },
    shadowColor: color.grey1,
    shadowOpacity: 0.4,
    shadowRadius: 30,
  },
});
