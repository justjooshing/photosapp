import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, StyleSheet, View } from "react-native";
import { Button } from "tamagui";

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
  const [viewedTab, setViewedTab] = useState<number>(0);

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

  if (!albums.data?.albums.length) {
    return (
      <View>
        <Text style={styles.empty}>No data</Text>
        <Text>
          If you were expecting something different please refresh or try again
          later
        </Text>
      </View>
    );
  }

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

  const tabCopy = [
    {
      heading: `Clean up (${albums.data.withDeletedCount.length})`,
      copy: "Your goal is to have this list empty, it means you've deleted all the images that you decided you wanted to delete.",
    },
    {
      heading: `All sorted (${albums.data.noDeletedCount.length})`,
      copy: "These are the albums containing only images you've decided you want to keep.",
    },
  ];

  return (
    <>
      {filter === "count" && (
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            gap: 10,
          }}
        >
          {tabCopy.map(({ heading }, i) => (
            <Button key={heading} onPress={() => setViewedTab(i)}>
              <Text>{heading}</Text>
            </Button>
          ))}
        </View>
      )}
      {filter === "count" && <Text>{tabCopy[viewedTab].copy}</Text>}
      <GeneratedList
        data={
          viewedTab === 0
            ? albums.data.withDeletedCount
            : albums.data.noDeletedCount
        }
      />
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
