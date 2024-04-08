import { Link } from "expo-router";
import { FlatList, Pressable, Text, StyleSheet } from "react-native";

import ImageTile from "./image_tile";

import { useGetAlbums } from "@/api/query";

const numColumns = 2;
const AlbumsList = ({ limit }: { limit?: number }) => {
  const albums = useGetAlbums();

  return (
    <FlatList
      data={albums.data?.albums || []}
      numColumns={numColumns}
      columnWrapperStyle={styles.column}
      keyExtractor={({ id }) => `${id}`}
      renderItem={({ item: album, index }) => {
        if (!limit || index < limit) {
          return (
            <Link key={album.id} href={`/albums/${album.id}`} asChild>
              <Pressable style={{ justifyContent: "flex-end" }}>
                {album.firstImage?.baseUrl ? (
                  <ImageTile image={album.firstImage} />
                ) : (
                  <Text>Where's the image?</Text>
                )}
                <Text>{album.title}</Text>
              </Pressable>
            </Link>
          );
        }
        return null;
      }}
    />
  );
};

export default AlbumsList;

const styles = StyleSheet.create({
  column: {
    justifyContent: "space-around",
    paddingBottom: 10,
  },
});
