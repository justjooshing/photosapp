import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, StyleSheet, View } from "react-native";

import ImageTile from "./image_tile";
import Skeleton from "./skeleton";

import { useGetAlbums } from "@/api/queries/albums";
import { color } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";

const numColumns = 2;
const imageWidth = { width: `${100 / numColumns}%` } as const;

const AlbumsList = () => {
  const albums = useGetAlbums();
  const [viewedTab, setViewedTab] = useState<number>(0);

  const tabCopy = [
    {
      heading: `Clean up (${albums.isLoading ? "?" : albums.data?.withDeletedCount.length || 0})`,
      copy: "Your goal is to have this list empty, it means you've deleted all the images that you decided you wanted to delete.",
    },
    {
      heading: `All sorted (${albums.isLoading ? "?" : albums.data?.noDeletedCount.length || 0})`,
      copy: "These are the albums containing only images you've decided you want to keep.",
    },
  ];

  return (
    <>
      <View style={styles.filters}>
        {tabCopy.map(({ heading }, i) => (
          <Button
            variant="secondary"
            size="$1"
            radius="$1"
            key={heading}
            onPress={() => setViewedTab(i)}
          >
            <Button.Text>{heading}</Button.Text>
          </Button>
        ))}
      </View>
      <Text style={styles.filter_text}>{tabCopy[viewedTab].copy}</Text>

      {/* Is loading */}
      {albums.isLoading && (
        <FlatList
          data={Array(6)}
          numColumns={numColumns}
          columnWrapperStyle={styles.column}
          renderItem={() => (
            <View style={[imageWidth, styles.image, styles.loading_container]}>
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
      {!albums.isLoading && !!albums.data?.albums.length && (
        <FlatList
          data={
            viewedTab === 0
              ? albums.data?.withDeletedCount
              : albums.data?.noDeletedCount
          }
          numColumns={numColumns}
          columnWrapperStyle={styles.column}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item: album }) => (
            <Link
              key={album.id}
              href={`/albums/${album.id}`}
              asChild
              style={imageWidth}
            >
              <Pressable style={styles.image}>
                {!!album.deleteCount && (
                  <View style={styles.notification_dot}>
                    <Text style={styles.notification_dot_text}>
                      {album.deleteCount}
                    </Text>
                  </View>
                )}
                {album.firstImage?.baseUrl ? (
                  <ImageTile image={album.firstImage} />
                ) : (
                  <Text>Where's the image?</Text>
                )}
                <Text>{album.title}</Text>
              </Pressable>
            </Link>
          )}
        />
      )}
    </>
  );
};

export default AlbumsList;

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
  },
  filter_text: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  column: {
    paddingBottom: 10,
  },
  image: { alignItems: "center", position: "relative" },
  notification_dot: {
    position: "absolute",
    top: 0,
    right: 20,
    margin: 2,
    zIndex: 1,
    backgroundColor: color.red2,
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    aspectRatio: 1,
    borderRadius: 20,
  },
  notification_dot_text: { color: color.white, fontSize: 10 },
  skeleton_container: {
    borderRadius: 20,
    width: "80%",
    aspectRatio: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  loading_container: { paddingVertical: 10 },
  empty: { fontSize: 20 },
});
