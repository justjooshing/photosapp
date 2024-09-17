import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { useMemo } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Spinner } from "tamagui";

import { useGetInfiniteAlbums } from "@/api/albums/queries";
import { SortOptions } from "@/api/types";
import ImageTile from "@/components/image_tile";
import Skeleton from "@/components/skeleton";
import { tokens } from "@/config/tamagui/tokens";
import { useAlbumsContext } from "@/context/albums";
import usePathname from "@/hooks/usePathname";

const numColumns = 2;

const Albums = ({ sortOption }: { sortOption: SortOptions }) => {
  const { sortBy } = useAlbumsContext();
  const pathname = usePathname();

  const infiniteAlbums = useGetInfiniteAlbums(sortOption);

  const tabCopy = {
    delete:
      "These image sets contain those that you've said you want to delete. Clean these up by deleting them from Google",
    keep: "These image sets only contain images that you've decided you want to keep",
  };

  const data = useMemo(
    () => infiniteAlbums.data?.pages.flatMap(({ albums }) => albums),
    [infiniteAlbums],
  );

  const handleEndReached = () => {
    if (
      infiniteAlbums.hasNextPage &&
      !infiniteAlbums.isFetching &&
      pathname.path === "albums" &&
      sortBy === sortOption
    ) {
      infiniteAlbums.fetchNextPage();
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.filter_text}>{tabCopy[sortOption]}</Text>

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
                            sortOption === SortOptions.DELETE
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
    paddingHorizontal: 20,
    flex: 1,
    width: "100%",
    minHeight: "100%",
  },
  filter_text: {
    display: "flex",
    justifyContent: "center",
    fontSize: tokens.fontSize[1],
    borderColor: tokens.color.grey2,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: tokens.radius[3],
    padding: tokens.space[3],
    margin: tokens.space[1],
    textAlign: "center",
  },
  image: {
    alignItems: "center",
    position: "relative",
    width: "100%",
    paddingVertical: tokens.space[2],
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
    borderRadius: tokens.radius[3],
  },
  notification_dot_text: { color: tokens.color.white, fontSize: 10 },
  skeleton_container: {
    borderRadius: tokens.radius[3],
    width: "80%",
    aspectRatio: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  empty: { fontSize: tokens.fontSize[2] },
  infinite_fetching_container: {
    padding: tokens.space[2],
    width: "100%",
  },
});
