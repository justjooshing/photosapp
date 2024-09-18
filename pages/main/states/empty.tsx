import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/config/tamagui/variants";
import { useImageContext } from "@/context/image";

const Empty = () => {
  const { setImageType, imageType, currentImageIndex, setCurrentImageIndex } =
    useImageContext();

  const { copy, cta } = {
    similar: {
      copy: "No more similar image sets needing to be sorted.",
      cta: "View images from prior years",
    },
    today: {
      copy: "No more images from this date over the years needing to be sorted.",
      cta: "View oldest images",
    },
    oldest: {
      copy: "Wow, no more images to sort through at all!",
      cta: "View images to be deleted",
    },
  }[imageType];

  const handlePress = () => {
    if (currentImageIndex) setCurrentImageIndex(0);
    if (imageType !== "oldest")
      setImageType((prev) => (prev === "similar" ? "today" : "oldest"));
  };

  return (
    <View style={styles.wrapper}>
      <Text>{copy}</Text>
      <Text>Check back again tomorrow.</Text>
      <Button variant="primary" size="$1" radius="$1" onPress={handlePress}>
        {imageType === "oldest" ? (
          <Link href="/albums">
            <Button.Text>{cta}</Button.Text>
          </Link>
        ) : (
          <Button.Text>{cta}</Button.Text>
        )}
      </Button>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
});
