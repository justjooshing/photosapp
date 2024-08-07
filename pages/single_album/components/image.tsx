import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { View, Pressable, StyleSheet } from "react-native";

import Button from "./button";

import { ApiImage, SortOptions } from "@/api/types";
import ImageTile from "@/components/image_tile";
import { tokens } from "@/config/tamagui/tokens";
import { useImageContext } from "@/context/image";

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
      <ImageTile baseUrl={image.baseUrl} />
      <View style={styles.button_wrapper}>
        {Object.values(SortOptions).map((val) => (
          <Button key={val} image={image} choice={val} />
        ))}
        <Pressable onPress={handleButtonClick}>
          <AntDesign
            name="google"
            size={20}
            color={tokens.color.black}
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
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  button_google: { userSelect: "none" },
});
