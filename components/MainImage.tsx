import React from "react";
import {
  Image,
  StyleSheet,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import Animated from "react-native-reanimated";

import { IImage } from "@/context/Images/types";

type Props = {
  image: IImage;
  style: ImageStyle;
};

const MainImage = ({ image: { baseUrl, width, height }, style }: Props) => {
  // For some reason these don't work on Android but LocalImage does
  const sourceImage: ImageSourcePropType = {
    uri: baseUrl,
    width: 500,
    height: 500,
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
