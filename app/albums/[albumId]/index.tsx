import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { H2 } from "tamagui";

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
    <View style={styles.container}>
      <H2 fontSize="$8">{singleAlbum.data.title}</H2>
      <FlatList
        data={singleAlbum.data.images}
        keyExtractor={({ id }) => `${id}`}
        numColumns={3}
        contentContainerStyle={styles.album_container}
        renderItem={({ item }) => (
          <Link
            key={item.id}
            href={item.baseUrl}
            asChild
            style={styles.album_item}
          >
            <Pressable>
              <ImageTile image={item} />
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
};

export default SingleAlbum;

const styles = StyleSheet.create({
  container: { width: "100%" },
  album_container: { gap: 20 },
  album_item: {
    minWidth: "50%",
  },
});
