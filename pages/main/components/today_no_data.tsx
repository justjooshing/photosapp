import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useHeadingContext } from "@/context/header";
import { Button } from "@/tamagui/variants";

const TodayNoData = () => {
  const { setImageType } = useHeadingContext();
  return (
    <View style={styles.wrapper}>
      <Text>
        No more images from this date over the years needing to be sorted.
      </Text>
      <Text>Check back again tomorrow.</Text>
      <Button
        variant="primary"
        size="$small"
        radius="$small"
        onPress={() => setImageType("similar")}
      >
        Click here to view similar images
      </Button>
    </View>
  );
};

export default TodayNoData;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
});
