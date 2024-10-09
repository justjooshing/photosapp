import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Spinner } from "tamagui";

import { useGetInfiniteAlbums } from "@/server/albums/queries";
import { SortOptions } from "@/server/types";
import ImageTile from "@/components/image_tile";
import { numColumns } from "@/config/constants";
import { tokens } from "@/config/tamagui/tokens";
import { useAlbumsContext } from "@/context/albums";
import usePathname from "@/hooks/usePathname";

type Props = {
  sortOption: SortOptions;
};

const Data = ({ sortOption }: Props) => {
  const { sortBy } = useAlbumsContext();
  const pathname = usePathname();
  const infiniteAlbums = useGetInfiniteAlbums(sortOption);

  const data = useMemo(
    () => infiniteAlbums.data?.pages.flatMap(({ albums }) => albums),
    [infiniteAlbums],
  );
  const handleEndReached = () => {
    const canRefetch =
      infiniteAlbums.hasNextPage &&
      !infiniteAlbums.isFetching &&
      pathname.path === "albums" &&
      !pathname.slug &&
      sortBy === sortOption;

    if (canRefetch) {
      infiniteAlbums.fetchNextPage();
    }
  };
  return (
    <>
      <FlashList
        data={data}
        numColumns={numColumns}
        estimatedItemSize={data?.length || 10}
        keyExtractor={({ id }) => id.toString()}
        onEndReachedThreshold={0.8}
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
  );
};

export default Data;

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
  infinite_fetching_container: {
    padding: tokens.space[2],
    width: "100%",
  },
});
