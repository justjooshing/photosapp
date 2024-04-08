import { ImageSourcePropType, Image, StyleSheet } from "react-native";

import { ApiImage } from "@/api/types";
type Props = {
  image: ApiImage;
};

function ImageTile({ image }: Props) {
  const imageSource: ImageSourcePropType = {
    uri: image.baseUrl,
  };

  return (
    <Image source={imageSource} resizeMode="contain" style={styles.image} />
  );
}

export default ImageTile;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
    aspectRatio: 1,
  },
});
