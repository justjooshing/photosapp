import { useGetSingleAlbum } from "@/api/query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ImageTile from "@/components/ImageTile";

const SingleAlbum = () => {
  const { albumId } = useLocalSearchParams();

  // AlbumId should be a number as a string
  if (isNaN(+albumId) || Array.isArray(albumId)) {
    router.back();
    return;
  }

  const singleAlbum = useGetSingleAlbum(albumId);

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
