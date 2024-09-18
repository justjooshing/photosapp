import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Spinner } from "tamagui";

import { useGetInfiniteAlbums } from "@/api/albums/queries";
import { SortOptions } from "@/api/types";
import ImageTile from "@/components/image_tile";
import Skeleton from "@/components/skeleton";
import { tokens } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";
import { useAlbumsContext } from "@/context/albums";
import usePathname from "@/hooks/usePathname";

const numColumns = 2;

const copy = {
  empty: {
    heading: (filter: SortOptions) =>
      filter === SortOptions.DELETE
        ? "Great job cleaning up!"
        : "All sorted, nothing kept",
    copy: (filter: SortOptions) =>
      filter === SortOptions.DELETE
        ? "You've successfully deleted marked images!"
        : "Try sorting more images",
    cta: "Sort images",
  },
};

const AlbumSet = ({ sortOption }: { sortOption: SortOptions }) => {
  const { sortBy } = useAlbumsContext();
  const pathname = usePathname();

  const infiniteAlbums = useGetInfiniteAlbums(sortOption);
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

  // Is loading
  if (infiniteAlbums.isLoading)
    return (
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
    );

  // No data
  if (!infiniteAlbums.isLoading && !data?.length)
    return (
      <View style={styles.empty_container}>
        <View style={styles.empty_icon_container}>
          <View style={styles.empty_icon_group}>
            {sortOption === SortOptions.DELETE && (
              <MaterialIcons
                name="auto-awesome"
                size={64}
                color={tokens.color.blue}
              />
            )}
            <View style={styles.empty_icon}>
              <AntDesign
                name="folderopen"
                size={144}
                color={tokens.color.grey6}
              />
            </View>
            {sortOption === SortOptions.DELETE && (
              <MaterialIcons
                name="auto-awesome"
                size={64}
                color={tokens.color.blue}
              />
            )}
          </View>
        </View>
        <Text style={styles.empty_heading}>
          {copy.empty.heading(sortOption)}
        </Text>
        <Text style={styles.empty_copy}>{copy.empty.copy(sortOption)}</Text>
        <View style={styles.empty_cta}>
          <Button variant="primary" size="$1" radius="$1">
            <Link href="/">
              <Button.Text>{copy.empty.cta}</Button.Text>
            </Link>
          </Button>
        </View>
      </View>
    );

  // Data
  return (
    !infiniteAlbums.isLoading &&
    !!data?.length && (
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
    )
  );
};

export default AlbumSet;

const styles = StyleSheet.create({
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
  empty_container: {
    height: "100%",
    justifyContent: "flex-end",
    flexShrink: 1,
    paddingBottom: tokens.space[3],
  },
  empty_icon_container: { height: "100%", justifyContent: "center" },
  empty_icon_group: {
    flexDirection: "row",
    justifyContent: "center",
  },
  empty_icon: { paddingLeft: 20, paddingRight: 10 },
  empty_heading: {
    fontSize: tokens.fontSize[2],
    fontWeight: "600",
    paddingVertical: tokens.space[2],
    color: tokens.color.grey7,
  },
  empty_copy: {
    color: tokens.color.grey7,
  },
  empty_cta: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingTop: tokens.space[4],
  },
  infinite_fetching_container: {
    padding: tokens.space[2],
    width: "100%",
  },
});
