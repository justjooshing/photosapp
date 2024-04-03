import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import { IImage } from "@/context/Images/types";

type Props = {
  image: IImage;
};

const FSImage = ({ image }: Props) => {
  const { width, height } = useWindowDimensions();
  // For some reason these don't work on Android but LocalImage does
  const sourceImage: ImageSourcePropType = {
    uri: image.baseUrl,
    width: width - 10,
    height,
  };
  return (
    <Image resizeMode="contain" source={sourceImage} style={styles.image} />
  );
};

export default FSImage;

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
  },
});
