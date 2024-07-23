import { FlashList } from "@shopify/flash-list";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";

import Image from "./image";
import { FilterOptions } from "../types";

import { useGetSingleAlbum } from "@/api/queries/albums";
import Skeleton from "@/components/skeleton";
import { Button } from "@/config/tamagui/variants";

const numColumns = 2;

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
      <FlashList
        data={Array(6)}
        estimatedItemSize={6}
        numColumns={numColumns}
        renderItem={() => (
          <View style={styles.image}>
            <View style={styles.skeleton_container}>
              <Skeleton />
            </View>
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
        <FlashList
          data={images}
          estimatedItemSize={8}
          keyExtractor={({ id }) => id.toString()}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <View style={styles.image}>
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
  image: {
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
});
