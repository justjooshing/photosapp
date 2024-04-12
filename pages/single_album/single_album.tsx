import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import FilterButton from "./components/filter_button";
import Image from "./components/image";

import { useGetSingleAlbum } from "@/api/query";
import { FilterOptions } from "@/pages/single_album/types";

const SingleAlbum = () => {
  const { albumId } = useLocalSearchParams();
  const [filter, setFilter] = useState<FilterOptions>("all");

  const opacityStyle = { opacity: filter === "all" ? 0.5 : 1 };

  const singleAlbum = useGetSingleAlbum(
    typeof albumId === "string" ? albumId : albumId[0],
  );

  // AlbumId should be a number as a string
  if (isNaN(+albumId) || Array.isArray(albumId)) {
    router.back();
    return;
  }

  if (singleAlbum.isLoading) return <Text>loading...</Text>;
  if (singleAlbum.isError) return <Text>{singleAlbum.error.message}</Text>;

  const images =
    filter === "all"
      ? singleAlbum.data.images
      : singleAlbum.data.images.filter(
          (image) => image.sorted_status === filter,
        );

  return (
    <View style={styles.container}>
      <View style={styles.filter_header}>
        <View style={styles.filter_buttons_wrapper}>
          <FilterButton choice="keep" filter={filter} setFilter={setFilter} />
          <FilterButton choice="delete" filter={filter} setFilter={setFilter} />
          <Pressable onPress={() => setFilter("all")}>
            <Text style={opacityStyle}>All</Text>
          </Pressable>
        </View>
      </View>
      <FlatList
        data={images}
        keyExtractor={({ id }) => `${id}`}
        numColumns={2}
        contentContainerStyle={styles.album_container}
        renderItem={({ item }) => <Image image={item} key={item.id} />}
      />
    </View>
  );
};

export default SingleAlbum;

const styles = StyleSheet.create({
  container: { width: "100%" },
  album_container: { gap: 20 },
  filter_header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  filter_buttons_wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
