import { Link } from "expo-router";
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";

import ImageTile from "./ImageTile";

import { useGetAlbums } from "@/api/query";

const numColumns = 2;
const Albums = ({ limit }: { limit?: number }) => {
  const albums = useGetAlbums();

  return (
    <View style={styles.container}>
      <FlatList
        data={albums.data?.albums || []}
        numColumns={numColumns}
        keyExtractor={({ id }) => `${id}`}
        renderItem={({ item: album, index }) => {
          if (!limit || index < limit) {
            return (
              <Link key={album.id} href={`/albums/${album.id}`} asChild>
                <Pressable>
                  <ImageTile image={album.firstImage} />
                  <Text>{album.title}</Text>
                </Pressable>
              </Link>
            );
          }
          return null;
        }}
      />
    </View>
  );
};

export default Albums;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
