import {
  ImageSourcePropType,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

import ImageWithError from "./image_with_error_handler";

import { ApiImage } from "@/api/types";

type Props = {
  image: ApiImage;
};

const FSImage = ({ image }: Props) => {
  const { width, height } = useWindowDimensions();
  const sourceImage: ImageSourcePropType = {
    uri: image.baseUrl,
    width: width - 10,
    height,
  };

  return (
    <View style={{ justifyContent: "center", height: "100%" }}>
      <ImageWithError
        imageProps={{
          resizeMode: "contain",
          source: sourceImage,
          style: styles.image,
        }}
        errorProps={{ size: width - 56 }}
      />
    </View>
  );
};

export default FSImage;

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
});
