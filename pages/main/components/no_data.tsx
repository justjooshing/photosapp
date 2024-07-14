import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/config/tamagui/variants";
import { useImageContext } from "@/context/image";

const NoData = () => {
  const { setImageType, imageType, currentImageIndex, setCurrentImageIndex } =
    useImageContext();
  const router = useRouter();

  const { copy, cta, ctaFn } = {
    similar: {
      copy: "No more similar image sets needing to be sorted.",
      cta: "View images from prior years",
      ctaFn: () => setImageType("today"),
    },
    today: {
      copy: "No more images from this date over the years needing to be sorted.",
      cta: "View oldest images",
      ctaFn: () => setImageType("oldest"),
    },
    oldest: {
      copy: "Wow, no more images to sort through at all!",
      cta: "View images to be deleted",
      ctaFn: () => router.push("/albums"),
    },
  }[imageType];

  const handlePress = () => {
    if (currentImageIndex) setCurrentImageIndex(0);
    ctaFn();
  };

  return (
    <View style={styles.wrapper}>
      <Text>{copy}</Text>
      <Text>Check back again tomorrow.</Text>
      <Button variant="primary" size="$1" radius="$1" onPress={handlePress}>
        <Button.Text>{cta}</Button.Text>
      </Button>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
});
