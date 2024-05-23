import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { View, Pressable, StyleSheet } from "react-native";

import Button from "./button";

import { ApiImage } from "@/api/types";
import ImageTile from "@/components/image_tile";
import { useImageContext } from "@/context/image";
import { color } from "@/tamagui/tokens";

type Props = { image: ApiImage };

const Image = ({ image }: Props) => {
  const { setTargetImage } = useImageContext();
  const handleButtonClick = () => {
    WebBrowser.openBrowserAsync(image.productUrl);
    // Keep track of which image we've just viewed to refetch baseUrl
    setTargetImage(image);
  };

  return (
    <>
      <Pressable>
        <ImageTile image={image} />
      </Pressable>
      <View style={styles.button_wrapper}>
        <Button image={image} choice="keep" />
        <Button image={image} choice="delete" />
        <Pressable onPress={handleButtonClick}>
          <AntDesign
            name="google"
            size={20}
            color={color.black}
            style={styles.button_google}
          />
        </Pressable>
      </View>
    </>
  );
};

export default Image;

const styles = StyleSheet.create({
  button_wrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 10,
  },
  button_google: { userSelect: "none" },
});
