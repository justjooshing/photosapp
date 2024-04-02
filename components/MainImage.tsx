import React from "react";
import {
  Image,
  StyleSheet,
  ImageSourcePropType,
  Dimensions,
  ImageStyle,
} from "react-native";
import Animated from "react-native-reanimated";

import { IImage } from "@/context/Images/types";

type Props = {
  image: IImage;
  animatedStyles: ImageStyle;
};

const { width, height } = Dimensions.get("window");
const MainImage = ({ image, animatedStyles }: Props) => {
  // For some reason these don't work on Android but LocalImage does
  const sourceImage: ImageSourcePropType = {
    uri: image.baseUrl,
    width: width - 10,
    height,
  };

  return (
    <Animated.View style={animatedStyles}>
      <Image style={styles.image} resizeMode="contain" source={sourceImage} />
    </Animated.View>
  );
};

export default MainImage;

const styles = StyleSheet.create({
  image: {
    backgroundColor: "transparent",
  },
});
