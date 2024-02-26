import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
} from "react-native";
import Animated from "react-native-reanimated";

type Props = {
  source: ImageSourcePropType;
  style?: ImageStyle;
};

const UpcomingImage = ({ source, style }: Props) => {
  return (
    <Animated.View style={style}>
      <Image style={[styles.UpcomingImage, style]} source={source} />
    </Animated.View>
  );
};

export default UpcomingImage;

const styles = StyleSheet.create({
  UpcomingImage: {
    maxWidth: "100%",
    maxHeight: "80%",
    zIndex: 1,
  },
});
