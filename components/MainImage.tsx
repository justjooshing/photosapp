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
    <Animated.View style={style}>
      <NativeImage style={styles.image} source={source} />
    </Animated.View>
  );
};

export default MainImage;

const styles = StyleSheet.create({
  image: {
    maxWidth: "100%",
    maxHeight: "80%",
    zIndex: 2,
  },
});
