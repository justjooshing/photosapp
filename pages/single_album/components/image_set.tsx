import { AntDesign } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import Image from "./image";
import { FilterOptionsType } from "../types";

import { useGetSingleAlbum } from "@/api/albums/queries";
import { SortOptions } from "@/api/types";
import ErrorHandler from "@/components/error_handler";
import Skeleton from "@/components/skeleton";
import { tokens } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";

const numColumns = 2;
const copy = {
  text: (filter: FilterOptionsType) =>
    `No images marked under ${filter}${filter === "all" ? "" : ", try setting to 'All'"}`,
  cta: (filter: FilterOptionsType) =>
    filter === "all" ? "Back to Albums" : "View All Images",
};

type Props = {
  albumId: string;
  filter: FilterOptionsType;
  setFilter: Dispatch<SetStateAction<FilterOptionsType>>;
};
const ImageSet = ({ albumId, filter, setFilter }: Props) => {
  const singleAlbum = useGetSingleAlbum(albumId);

  const images = useMemo(() => {
    if (!singleAlbum.data?.images.length) return [];
    if (filter === SortOptions.KEEP) return singleAlbum.data?.kept;
    if (filter === SortOptions.DELETE) return singleAlbum.data?.deleted;
    return singleAlbum.data?.images;
  }, [filter, singleAlbum]);

  const handleEmptyClick = () => {
    if (filter !== "all") setFilter("all");
  };

  if (singleAlbum.isError) return <ErrorHandler error={singleAlbum.error} />;
  if (singleAlbum.isLoading)
    return (
      <FlashList
        data={Array(6)}
        estimatedItemSize={6}
        numColumns={numColumns}
        renderItem={() => (
          <View style={styles.image}>
            <View style={styles.skeleton_container}>
              <Skeleton />
            </View>
          </View>
        )}
      />
    );

  if (!images.length)
    return (
      <View style={styles.empty_container}>
        <View style={styles.empty_icon}>
          <AntDesign name="folderopen" size={144} color={tokens.color.grey6} />
          <Text style={styles.empty_copy}>{copy.text(filter)}</Text>
        </View>
        <View style={styles.empty_cta}>
          <Button
            variant="primary"
            size="$1"
            radius="$1"
            onPress={handleEmptyClick}
          >
            {filter === "all" ? (
              <Link href="/albums">
                <Button.Text>{copy.cta(filter)}</Button.Text>
              </Link>
            ) : (
              <Button.Text>{copy.cta(filter)}</Button.Text>
            )}
          </Button>
        </View>
      </View>
    );

  return (
    <FlashList
      data={images}
      estimatedItemSize={8}
      keyExtractor={({ id }) => id.toString()}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <View style={styles.image}>
          <Image image={item} />
        </View>
      )}
    />
  );
};

export default ImageSet;

const styles = StyleSheet.create({
  skeleton_container: {
    borderRadius: 20,
    width: "80%",
    aspectRatio: 1,
    overflow: "hidden",
  },
  empty_container: {
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: tokens.space[3],
  },
  empty_copy: {
    color: tokens.color.grey7,
  },
  empty_icon: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  empty_cta: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  image: {
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
});
