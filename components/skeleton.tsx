import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";

import { tokens } from "@/config/tamagui/tokens";

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
        <View style={styles.bar}>
          <Shadow
            style={styles.shadow}
            containerStyle={styles.shadow_container}
            distance={50}
            sides={{ start: false, bottom: false, top: false, end: true }}
            startColor={tokens.color.grey1}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: "100%",
    backgroundColor: tokens.color.grey2,
    justifyContent: "center",
    overflow: "hidden",
  },
  shimmer: {
    height: "110%",
  },
  bar: {
    transform: "rotate(5deg)",
    height: "100%",
  },
  shadow_container: {
    opacity: 0.4,
  },
  shadow: {
    height: "100%",
  },
});
