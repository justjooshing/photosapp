import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useHeadingContext } from "@/context/header";
import { Button } from "@/tamagui/variants";

const NoData = () => {
  const { setImageType, imageType } = useHeadingContext();
  const router = useRouter();

  const { copy, cta, handlePress } = {
    similar: {
      copy: "No more similar image sets needing to be sorted.",
      cta: "View images from prior years",
      handlePress: () => setImageType("today"),
    },
    today: {
      copy: "No more images from this date over the years needing to be sorted.",
      cta: "View oldest images",
      handlePress: () => setImageType("oldest"),
    },
    oldest: {
      copy: "Wow, no more images to sort through at all!",
      cta: "View images to be deleted",
      handlePress: () => router.push("/albums"),
    },
  }[imageType];

  return (
    <View style={styles.wrapper}>
      <Text>{copy}</Text>
      <Text>Check back again tomorrow.</Text>
      <Button
        variant="primary"
        size="$small"
        radius="$small"
        onPress={handlePress}
      >
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
