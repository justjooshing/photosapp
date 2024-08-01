import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Spinner } from "tamagui";

import { useGetInfiniteAlbums } from "@/api/queries/albums";
import { useGetCount } from "@/api/queries/images";
import { SortOptions } from "@/api/types";
import ImageTile from "@/components/image_tile";
import Skeleton from "@/components/skeleton";
import { tokens } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";

const numColumns = 2;

const AlbumsList = () => {
  const counts = useGetCount();
  // add a type here to control which pages we are fetching
  const [viewedTab, setViewedTab] = useState<SortOptions>("delete");
  const infiniteAlbums = useGetInfiniteAlbums(viewedTab);

  const tabCopy = {
    delete: {
      heading: `Clean up (${counts.isLoading ? "?" : counts.data?.albumsToDelete.count || 0})`,
      copy: "Your goal is to have this list empty, it means you've deleted all the images that you decided you wanted to delete.",
    },
    keep: {
      heading: `All sorted (${counts.isLoading ? "?" : counts.data?.albumsKept.count || 0})`,
      copy: "These are the image sets containing only images you've decided you want to keep.",
    },
  };

  const data = useMemo(
    () => infiniteAlbums.data?.pages.flatMap(({ albums }) => albums),
    [infiniteAlbums],
  );

  const handleEndReached = () => {
    if (infiniteAlbums.hasNextPage && !infiniteAlbums.isFetching) {
      infiniteAlbums.fetchNextPage();
    }
  };

  return (
    <>
      <View style={styles.filters}>
        {Object.entries(tabCopy).map(([key, { heading }]) => (
          <Button
            variant={viewedTab === key ? "primary" : "secondary"}
            size="$1"
            radius="$1"
            key={heading}
            onPress={() =>
              // type coercion bad
              setViewedTab(key as SortOptions)
            }
          >
            <Button.Text>{heading}</Button.Text>
          </Button>
        ))}
      </View>
      <Text style={styles.filter_text}>{tabCopy[viewedTab].copy}</Text>

      {/* Is loading */}
      {infiniteAlbums.isLoading && (
        <FlashList
          data={Array(6)}
          numColumns={numColumns}
          estimatedItemSize={6}
          renderItem={() => (
            <View style={styles.image}>
              <View style={styles.skeleton_container}>
                <Skeleton />
              </View>
            </View>
          )}
        />
      )}

      {/* No data */}
      {!infiniteAlbums.isLoading && !data?.length && (
        <View>
          <Text style={styles.empty}>No data</Text>
          <Text>
            If you were expecting something different please refresh or try
            again later
          </Text>
        </View>
      )}

      {/* With data */}
      {!infiniteAlbums.isLoading && !!data?.length && (
        <>
          <FlashList
            data={data}
            numColumns={numColumns}
            estimatedItemSize={data?.length || 10}
            keyExtractor={({ id }) => id.toString()}
            onEndReached={handleEndReached}
            renderItem={({ item: album }) => (
              <Link
                key={album.id}
                href={`/albums/${album.id}`}
                style={styles.image}
                asChild
              >
                <Pressable>
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
                </Pressable>
              </Link>
            )}
          />
          {infiniteAlbums.hasNextPage && infiniteAlbums.isFetching && (
            <View style={styles.infinite_fetching_container}>
              <Spinner />
            </View>
          )}
        </>
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
  image: {
    alignItems: "center",
    position: "relative",
    width: "100%",
    paddingVertical: 10,
  },
  notification_dot: {
    position: "absolute",
    top: 0,
    right: 20,
    margin: 2,
    zIndex: 1,
    backgroundColor: tokens.color.red2,
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    aspectRatio: 1,
    borderRadius: 20,
  },
  notification_dot_text: { color: tokens.color.white, fontSize: 10 },
  skeleton_container: {
    borderRadius: 20,
    width: "80%",
    aspectRatio: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  empty: { fontSize: 20 },
  infinite_fetching_container: {
    padding: tokens.space[2],
    width: "100%",
  },
});
