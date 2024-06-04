import { ImageSourcePropType, StyleSheet } from "react-native";

import ImageWithError from "./image_with_error_handler";

import { ApiImage } from "@/api/types";
import { color } from "@/tamagui/tokens";

type Props = {
  image: ApiImage;
};

function ImageTile({ image }: Props) {
  const imageSource: ImageSourcePropType = {
    uri: image.baseUrl,
  };

  return (
    <ImageWithError
      imageProps={{
        source: imageSource,
        resizeMode: "contain",
        style: styles.image,
      }}
      errorProps={{ size: 72 }}
    />
  );
}

export default ImageTile;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
    aspectRatio: 1,
    borderColor: color.grey2,
    borderWidth: 1,
  },
});
