import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { View, Pressable, StyleSheet } from "react-native";

import Button from "./button";

import { ApiImage } from "@/api/types";
import ImageTile from "@/components/image_tile";

type Props = { image: ApiImage };

const Image = ({ image }: Props) => (
  <View style={styles.album_item}>
    <Pressable>
      <ImageTile image={image} />
    </Pressable>
    <View style={styles.button_wrapper}>
      <Button image={image} choice="keep" />
      <Button image={image} choice="delete" />
      <Pressable onPress={() => WebBrowser.openBrowserAsync(image.productUrl)}>
        <AntDesign
          name="google"
          size={20}
          color="black"
          style={styles.button_google}
        />
      </Pressable>
    </View>
  </View>
);

export default Image;

const styles = StyleSheet.create({
  album_item: {
    minWidth: "50%",
  },
  button_wrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 10,
  },
  button_google: { userSelect: "none" },
});
