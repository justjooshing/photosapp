import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import Image from "./Image";
import { FilterOptions } from "../types";

import { useGetSingleAlbum } from "@/api/query";
import Skeleton from "@/components/skeleton";

const numColumns = 2;
const imageWidth = { minWidth: `${100 / numColumns}%` } as const;

type Props = {
  albumId: string;
  filter: FilterOptions;
};
const ImageSet = ({ albumId, filter }: Props) => {
  const singleAlbum = useGetSingleAlbum(albumId);

  if (singleAlbum.isError) return <Text>{singleAlbum.error.message}</Text>;

  const images =
    filter === "all"
      ? singleAlbum.data?.images
      : singleAlbum.data?.images.filter(
          (image) => image.sorted_status === filter,
        );

  if (singleAlbum.isLoading)
    return (
      <FlatList
        data={Array(6)}
        numColumns={2}
        contentContainerStyle={styles.album_container}
        renderItem={() => (
          <View style={[imageWidth, styles.image, { paddingVertical: 10 }]}>
            <View style={styles.skeleton_container}>
              <Skeleton />
            </View>
            <Text>Loading</Text>
          </View>
        )}
      />
    );

  return (
    <FlatList
      data={images}
      keyExtractor={({ id }) => `${id}`}
      numColumns={numColumns}
      contentContainerStyle={styles.album_container}
      renderItem={({ item }) => (
        <View style={imageWidth}>
          <Image image={item} key={item.id} />
        </View>
      )}
    />
  );
};

export default ImageSet;

const styles = StyleSheet.create({
  skeleton_container: {
    borderRadius: 20,
    width: "80%",
    aspectRatio: 1,
    overflow: "hidden",
  },
  album_container: { gap: 20 },
  image: {
    alignItems: "center",
  },
});
