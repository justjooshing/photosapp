import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import Image from "./image";
import { FilterOptions } from "../types";

import { useGetSingleAlbum } from "@/api/queries/albums";
import Skeleton from "@/components/skeleton";
import { Button } from "@/config/tamagui/variants";

const numColumns = 2;
const imageWidth = { width: `${100 / numColumns}%` } as const;

type Props = {
  albumId: string;
  filter: FilterOptions;
  setFilter: Dispatch<SetStateAction<FilterOptions>>;
};
const ImageSet = ({ albumId, filter, setFilter }: Props) => {
  const singleAlbum = useGetSingleAlbum(albumId);

  if (singleAlbum.isError) return <Text>{singleAlbum.error.message}</Text>;
  if (singleAlbum.isLoading)
    return (
      <FlatList
        data={Array(6)}
        numColumns={2}
        contentContainerStyle={styles.album_container}
        renderItem={() => (
          <View style={[imageWidth, styles.image]}>
            <View style={styles.skeleton_container}>
              <Skeleton />
            </View>
            <Text>Loading</Text>
          </View>
        )}
      />
    );

  const images = (() => {
    if (!singleAlbum.data?.images.length) return [];
    if (filter === "keep") return singleAlbum.data?.kept;
    if (filter === "delete") return singleAlbum.data?.deleted;
    return singleAlbum.data?.images;
  })();

  return (
    <>
      {!images.length ? (
        <View style={styles.no_data}>
          <Text> No images marked under {filter}, try setting to 'All'</Text>
          <Button
            variant="primary"
            size="$1"
            radius="$1"
            onPress={() => setFilter("all")}
          >
            <Button.Text>View All Images</Button.Text>
          </Button>
        </View>
      ) : (
        <FlatList
          data={images}
          keyExtractor={({ id }) => id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.album_container}
          renderItem={({ item }) => (
            <View style={imageWidth} key={item.id}>
              <Image image={item} />
            </View>
          )}
        />
      )}
    </>
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
  no_data: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  album_container: { gap: 20 },
  image: {
    alignItems: "center",
    paddingVertical: 10,
  },
});
