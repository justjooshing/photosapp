import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useGetSingleAlbum } from "@/api/query";
import ImageTile from "@/components/ImageTile";

const SingleAlbum = () => {
  const { albumId } = useLocalSearchParams();
  const singleAlbum = useGetSingleAlbum(
    typeof albumId === "string" ? albumId : albumId[0],
  );

  // AlbumId should be a number as a string
  if (isNaN(+albumId) || Array.isArray(albumId)) {
    router.back();
    return;
  }

  if (singleAlbum.isLoading || singleAlbum.isFetching)
    return <Text>loading...</Text>;
  if (singleAlbum.isError) return <Text>{singleAlbum.error.message}</Text>;

  return (
    <View>
      <Text>{singleAlbum.data.title}</Text>
      <FlatList
        data={singleAlbum.data.images}
        numColumns={4}
        renderItem={({ item }) => <ImageTile image={item} />}
      />
    </View>
  );
};

export default SingleAlbum;
