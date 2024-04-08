import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { View, Pressable, StyleSheet } from "react-native";

import Button from "./Button";

import { ApiImage } from "@/api/types";
import ImageTile from "@/components/ImageTile";

type Props = { image: ApiImage };

const Image = ({ image }: Props) => (
  <View style={styles.album_item}>
    <Pressable>
      <ImageTile image={image} />
    </Pressable>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        paddingTop: 10,
      }}
    >
      <Button image={image} choice="keep" />
      <Button image={image} choice="delete" />
      <Link href={image.productUrl} asChild>
        <AntDesign
          name="google"
          size={20}
          color="black"
          style={{ userSelect: "none" }}
        />
      </Link>
    </View>
  </View>
);

export default Image;

const styles = StyleSheet.create({
  album_item: {
    minWidth: "50%",
  },
});
