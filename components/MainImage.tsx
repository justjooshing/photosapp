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

const { height } = Dimensions.get("window");
const MainImage = ({ image, animatedStyles }: Props) => {
  // For some reason these don't work on Android but LocalImage does
  const sourceImage: ImageSourcePropType = {
    uri: image.baseUrl,
    width: 200,
    height: 500,
  };

  return (
    <Animated.View style={[styles.view, animatedStyles]}>
      <Image style={styles.image} resizeMode="contain" source={sourceImage} />
    </Animated.View>
  );
};

export default MainImage;

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    width: "80%",
    height: height - 20,
    maxHeight: "80%",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "80%",
    backgroundColor: "red",
  },
});
