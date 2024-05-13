import { Link } from "expo-router";
import { FlatList, Pressable, Text, StyleSheet, View } from "react-native";
import { H3 } from "tamagui";

import ImageTile from "./image_tile";
import Skeleton from "./skeleton";

import { useGetAlbums } from "@/api/queries/albums";
import { ApiAlbums } from "@/api/types";

const numColumns = 2;
const imageWidth = { minWidth: `${100 / numColumns}%` } as const;

interface AlbumsListProps {
  limit?: number;
  filter?: "count" | "none";
}

const AlbumsList = ({ limit, filter = "none" }: AlbumsListProps) => {
  const albums = useGetAlbums();

  if (albums.isLoading) {
    return (
      <>
        {filter === "count" && (
          <View style={{ height: 28, width: 120 }}>
            <Skeleton />
          </View>
        )}
        <FlatList
          data={Array(6)}
          numColumns={numColumns}
          columnWrapperStyle={styles.column}
          renderItem={() => (
            <View style={[imageWidth, styles.image, { paddingVertical: 10 }]}>
              <View style={styles.skeleton_container}>
                <Skeleton />
              </View>
              <Text>Loading</Text>
            </View>
          )}
        />
      </>
    );
  }

  const { withDeletedCount, noDeletedCount } = albums.data.albums.reduce(
    (acc, album) => {
      if (album.deleteCount) {
        acc.withDeletedCount.push(album);
      } else {
        acc.noDeletedCount.push(album);
      }
      return acc;
    },
    { withDeletedCount: [], noDeletedCount: [] },
  );

  const GeneratedList = ({ data }: { data: ApiAlbums["albums"] }) => (
    <FlatList
      data={data}
      numColumns={numColumns}
      columnWrapperStyle={styles.column}
      keyExtractor={({ id }) => id.toString()}
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

  return (
    <>
      {filter === "count" && <H3>Clean up</H3>}
      <GeneratedList data={withDeletedCount} />
      {filter === "count" && (
        <>
          <H3>All Sorted</H3>
          <GeneratedList data={noDeletedCount} />
        </>
      )}
    </>
  );
};

export default AlbumsList;

const styles = StyleSheet.create({
  column: {
    paddingBottom: 10,
  },
  image: { alignItems: "center" },
  skeleton_container: {
    borderRadius: 20,
    width: "80%",
    aspectRatio: 1,
    alignItems: "center",
    overflow: "hidden",
  },
});
