import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { useMemo } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Spinner } from "tamagui";

import { useGetInfiniteAlbums } from "@/api/queries/albums";
import { useGetCount } from "@/api/queries/images";
import { SortOptions } from "@/api/types";
import ImageTile from "@/components/image_tile";
import Skeleton from "@/components/skeleton";
import { tokens } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";
import { useAlbumsContext } from "@/context/albums";

const numColumns = 2;

const Albums = () => {
  const { sortBy, setSortBy } = useAlbumsContext();

  const counts = useGetCount();
  const infiniteAlbums = useGetInfiniteAlbums(sortBy);

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
    <View style={styles.wrapper}>
      <View style={styles.filters}>
        {Object.entries(tabCopy).map(([key, { heading }]) => (
          <Button
            variant={sortBy === key ? "primary" : "secondary"}
            size="$1"
            radius="$1"
            key={heading}
            onPress={() => {
              // type coercion bad
              setSortBy(key as SortOptions);
            }}
          >
            <Button.Text>{heading}</Button.Text>
          </Button>
        ))}
      </View>
      <Text style={styles.filter_text}>{tabCopy[sortBy].copy}</Text>

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
                  {!!album._count.images && (
                    <View
                      style={[
                        styles.notification_dot,
                        {
                          backgroundColor:
                            sortBy === SortOptions.DELETE
                              ? tokens.color.red2
                              : tokens.color.green2,
                        },
                      ]}
                    >
                      <Text style={styles.notification_dot_text}>
                        {album._count.images}
                      </Text>
                    </View>
                  )}
                  {album.images.length && album.images[0].baseUrl ? (
                    <ImageTile baseUrl={album.images[0].baseUrl} />
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
    </View>
  );
};

export default Albums;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
  },
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
