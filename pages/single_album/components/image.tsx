import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { View, Pressable, StyleSheet, Text } from "react-native";

import { useUpdateSingleAlbumImage } from "@/api/images/mutations";
import { ApiImage, SortOptions } from "@/api/types";
import ImageTile from "@/components/image_tile";
import { tokens } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";
import { useImageContext } from "@/context/image";

const copy = {
  markAs: (updatedChoice: string) => `Mark to be ${updatedChoice}`,
  google: "Delete from Google Photos",
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

  const { markAsLabel, updated_status, markAsBgColor, markAsColor } = {
    [SortOptions.KEEP]: {
      markAsLabel: copy.markAs("deleted"),
      markAsBgColor: tokens.color.red,
      markAsColor: tokens.color.white,
      updated_status: SortOptions.DELETE,
    },
    [SortOptions.DELETE]: {
      markAsLabel: copy.markAs("kept"),
      markAsBgColor: tokens.color.green,
      markAsColor: tokens.color.white,
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
        <Pressable
          onPress={handleClick}
          style={[
            styles.image_sort,
            {
              backgroundColor: markAsBgColor,
            },
          ]}
        >
          <Button.Text
            style={{
              color: markAsColor,
            }}
          >
            {markAsLabel}
          </Button.Text>
        </Pressable>
        <Pressable onPress={handleButtonClick} style={styles.image_google}>
          <AntDesign name="google" size={20} color={tokens.color.black} />
          <Text>{copy.google}</Text>
        </Pressable>
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
    maxWidth: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: tokens.space[1],
    gap: tokens.space[1],
  },
  image_sort: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    padding: tokens.space[1],
  },
  image_google: {
    userSelect: "none",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tokens.color.grey2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: tokens.space[1],
    gap: tokens.space[1],
    textAlign: "center",
  },
});
