import { ImageSourcePropType, StyleSheet } from "react-native";

import ImageWithError from "./image_with_error_handler";

import { tokens } from "@/config/tamagui/tokens";

type Props = {
  baseUrl: string;
};

function ImageTile({ baseUrl }: Props) {
  const imageSource: ImageSourcePropType = {
    uri: baseUrl,
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
    borderColor: tokens.color.grey2,
    borderWidth: 1,
  },
});
