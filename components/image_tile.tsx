import { StyleSheet } from "react-native";

import ImageWithError from "./image_with_error_handler";

import { ApiImage } from "@/api/types";
import { tokens } from "@/config/tamagui/tokens";

type Props = {
  image: ApiImage;
};

const ImageTile = ({ image }: Props) => (
  <ImageWithError
    source={image.baseUrl}
    style={styles.image}
    contentFit="contain"
    errorProps={{ size: 72 }}
  />
);

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
