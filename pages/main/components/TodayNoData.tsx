import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "tamagui";

import { useHeadingContext } from "@/context/Header";

const TodayNoData = () => {
  const { setImageType } = useHeadingContext();
  return (
    <View style={styles.wrapper}>
      <Text>
        No more images from this date over the years needing to be sorted
      </Text>
      <Button onPress={() => setImageType("similar")}>
        Click here to view similar images
      </Button>
    </View>
  );
};

export default TodayNoData;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    gap: 10,
  },
});
