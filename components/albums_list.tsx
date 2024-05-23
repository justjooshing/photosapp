import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, StyleSheet, View } from "react-native";

import ImageTile from "./image_tile";
import Skeleton from "./skeleton";

import { useGetAlbums } from "@/api/queries/albums";
import { Button } from "@/tamagui/variants";

const numColumns = 2;
const imageWidth = { minWidth: `${100 / numColumns}%` } as const;

interface AlbumsListProps {
  limit?: number;
  filter?: "count" | "none";
}

const AlbumsList = ({ limit, filter = "none" }: AlbumsListProps) => {
  const albums = useGetAlbums();
  const [viewedTab, setViewedTab] = useState<number>(0);

  const tabCopy = [
    {
      heading: `Clean up (${albums.isLoading ? "?" : albums.data.withDeletedCount.length})`,
      copy: "Your goal is to have this list empty, it means you've deleted all the images that you decided you wanted to delete.",
    },
    {
      heading: `All sorted (${albums.isLoading ? "?" : albums.data.noDeletedCount.length})`,
      copy: "These are the albums containing only images you've decided you want to keep.",
    },
  ];

  return (
    <>
      {filter === "count" && (
        <>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              gap: 10,
            }}
          >
            {tabCopy.map(({ heading }, i) => (
              <Button
                variant="secondary"
                size="$small"
                radius="$small"
                key={heading}
                onPress={() => setViewedTab(i)}
              >
                {heading}
              </Button>
            ))}
          </View>
          <Text>{tabCopy[viewedTab].copy}</Text>
        </>
      )}

      {/* Is loading */}
      {albums.isLoading && (
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
      )}

      {/* No data */}
      {!albums.isLoading && !albums.data?.albums.length && (
        <View>
          <Text style={styles.empty}>No data</Text>
          <Text>
            If you were expecting something different please refresh or try
            again later
          </Text>
        </View>
      )}

      {/* With data */}
      {!albums.isLoading && !!albums.data.albums.length && (
        <FlatList
          data={
            viewedTab === 0
              ? albums.data?.withDeletedCount
              : albums.data?.noDeletedCount
          }
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
  empty: { fontSize: 20 },
});
