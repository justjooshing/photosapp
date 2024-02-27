import React from "react";
import {
  Image as NativeImage,
  StyleSheet,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import Animated from "react-native-reanimated";

type Props = {
  source: ImageSourcePropType;
  style: ImageStyle;
};

const MainImage = ({ source, style }: Props) => {
  return (
    <Animated.View style={[styles.view, style]}>
      <NativeImage style={styles.image} resizeMode="contain" source={source} />
    </Animated.View>
  );
};

export default MainImage;

const styles = StyleSheet.create({
  view: {
    maxHeight: "80%",
    zIndex: 2,
  },
  image: {
    maxWidth: "100%",
    maxHeight: "80%",
  },
});
