import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import FilterButton from "./components/filter_button";
import ImageSet from "./components/image_set";

import { SortOptions } from "@/api/types";
import { useAlbumsContext } from "@/context/albums";
import { FilterOptions } from "@/pages/single_album/types";

const SingleAlbum = () => {
  const { sortBy } = useAlbumsContext();
  const { albumId } = useLocalSearchParams();
  // Initiate as sortBy tab they're on currently
  const [filter, setFilter] = useState<FilterOptions>(sortBy);

  const opacityStyle = { opacity: filter === "all" ? 0.5 : 1 };

  // AlbumId should be a number as a string
  if (isNaN(+albumId) || Array.isArray(albumId)) {
    router.back();
    return;
  }

  const singleAlbumId = typeof albumId === "string" ? albumId : albumId[0];

  return (
    <View style={styles.container}>
      <View style={styles.filter_header}>
        <View style={styles.filter_buttons_wrapper}>
          {Object.values(SortOptions).map((val) => (
            <FilterButton
              key={val}
              choice={val}
              filter={filter}
              setFilter={setFilter}
            />
          ))}
          <Pressable onPress={() => setFilter("all")}>
            <Text style={opacityStyle}>All</Text>
          </Pressable>
        </View>
      </View>
      <ImageSet albumId={singleAlbumId} setFilter={setFilter} filter={filter} />
    </View>
  );
};

export default SingleAlbum;

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
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
