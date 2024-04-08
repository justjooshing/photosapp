import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useGetSingleAlbum } from "@/api/query";
import Button from "@/pages/Albums/components.tsx/Button";
import { FilterOptions } from "@/pages/Albums/types";
import Image from "@/pages/SingleAlbum/components/Image";

const SingleAlbum = () => {
  const { albumId } = useLocalSearchParams();
  const [filter, setFilter] = useState<FilterOptions>("all");

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Button choice="keep" filter={filter} setFilter={setFilter} />
          <Button choice="delete" filter={filter} setFilter={setFilter} />
          <Pressable onPress={() => setFilter("all")}>
            <Text style={{ opacity: filter === "all" ? 0.5 : 1 }}>All</Text>
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
});
