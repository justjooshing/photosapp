import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { View, StyleSheet } from "react-native";

import ImageTile from "@/components/image_tile";
import { tokens } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";
import { useImageContext } from "@/context/image";
import { useUpdateSingleAlbumImage } from "@/server/images/mutations";
import { ApiImage, SortOptions } from "@/server/types";

const copy = {
  markAs: (updatedChoice: SortOptions) => `Move to ${updatedChoice}`,
  google: "Delete from",
};

type Props = { image: ApiImage };
const Image = ({ image }: Props) => {
  const { mutate: updateImage } = useUpdateSingleAlbumImage(
    image.sorted_album_id.toString(),
  );
  const { setTargetImage } = useImageContext();

  const handleButtonClick = () => {
    WebBrowser.openBrowserAsync(image.productUrl);
    // Keep track of which image we've just viewed to refetch baseUrl
    setTargetImage(image);
  };

  const { markAsLabel, updated_status, variant } = {
    [SortOptions.KEEP]: {
      markAsLabel: copy.markAs(SortOptions.DELETE),
      variant: "primary",
      updated_status: SortOptions.DELETE,
    },
    [SortOptions.DELETE]: {
      markAsLabel: copy.markAs(SortOptions.KEEP),
      variant: "secondary",
      updated_status: SortOptions.KEEP,
    },
  }[image.sorted_status];

  const handleClick = () => {
    updateImage({
      imageId: image.id,
      sorted_status: updated_status,
    });
  };

  return (
    <View style={styles.image}>
      <ImageTile baseUrl={image.baseUrl} />
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
  image: {
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
  button_wrapper: {
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: tokens.space[1],
    gap: tokens.space[1],
  },
});
