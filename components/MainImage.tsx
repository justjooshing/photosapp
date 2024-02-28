import React from "react";
import {
  Image,
  StyleSheet,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import Animated from "react-native-reanimated";
import LocalImage from "@/assets/images/image.jpg";

type Props = {
  source: string;
  style: ImageStyle;
};

const MainImage = ({ source, style }: Props) => {
  // For some reason these don't work on Android but LocalImage does
  const sourceImage: ImageSourcePropType = {
    uri: source,
    width: 1000,
    height: 1000,
  };

  return (
    <Animated.View style={[styles.view, style]}>
      <Image style={styles.image} resizeMode="contain" source={sourceImage} />
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
