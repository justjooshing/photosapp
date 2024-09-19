import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";

import Image from "../components/image";

import { useGetSingleAlbum } from "@/api/albums/queries";
import { numColumns } from "@/config/constants";

const Data = () => {
  const singleAlbum = useGetSingleAlbum();

  return (
    <FlashList
      data={singleAlbum.data?.images || []}
      estimatedItemSize={8}
      keyExtractor={({ id }) => id.toString()}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <View style={styles.image}>
          <Image image={item} />
        </View>
      )}
    />
  );
};

export default Data;

const styles = StyleSheet.create({
  image: {
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
});
