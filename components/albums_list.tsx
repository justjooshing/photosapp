import { Link } from "expo-router";
import { FlatList, Pressable, Text, StyleSheet } from "react-native";

import ImageTile from "./image_tile";

import { useGetAlbums } from "@/api/query";

const numColumns = 2;
const imageWidth = { minWidth: `${100 / numColumns}%` } as const;

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
            <Link
              key={album.id}
              href={`/albums/${album.id}`}
              asChild
              style={imageWidth}
            >
              <Pressable style={styles.image}>
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
    paddingBottom: 10,
  },
  image: { alignItems: "center" },
});
