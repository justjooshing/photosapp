import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { View, StyleSheet } from "react-native";

import { imageDetails, copy } from "./constants";

import ImageModal from "@/components/image_modal";
import { tokens } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";
import { useImageContext } from "@/context/image";
import { useUpdateSingleAlbumImage } from "@/server/images/mutations";
import { ApiImage } from "@/server/types";

type Props = { image: ApiImage };
const Image = ({ image }: Props) => {
  const { mutate: updateImage } = useUpdateSingleAlbumImage(
    image.sorted_album_id.toString(),
  );
  const { setTargetImage } = useImageContext();
  const { markAsLabel, updated_status, variant } = imageDetails(
    image.sorted_status,
  );

  const handleButtonClick = () => {
    WebBrowser.openBrowserAsync(image.productUrl);
    // Keep track of which image we've just viewed to refetch baseUrl
    setTargetImage(image);
  };

  const handleClick = () => {
    updateImage({
      imageId: image.id,
      sorted_status: updated_status,
    });
  };

  return (
    <View style={styles.container}>
      <ImageModal baseUrl={image.baseUrl} style={styles.image} errorSize={72} />
      <View style={styles.button_wrapper}>
        <Button onPress={handleClick} variant={variant} full>
          <Button.Text padding={4} fontSize={tokens.fontSize[1]}>
            {markAsLabel}
          </Button.Text>
        </Button>
        <Button onPress={handleButtonClick} variant="google" full>
          <Button.Text
            color={tokens.color.white}
            fontSize={tokens.fontSize[1]}
            padding={4}
          >
            {copy.google}
          </Button.Text>
          <AntDesign name="google" size={20} color={tokens.color.white} />
        </Button>
      </View>
    </View>
  );
};

export default Image;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
  image: {
    borderColor: tokens.color.grey2,
    borderWidth: 1,
  },
  button_wrapper: {
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: tokens.space[1],
    gap: tokens.space[1],
  },
});
