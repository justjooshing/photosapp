import { router, useLocalSearchParams } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";

import ImageSet from "./components/image_set";

import { FilterOptionsType } from "@/pages/single_album/types";

interface SingleAlbumProps {
  filter: FilterOptionsType;
  setFilter: Dispatch<SetStateAction<FilterOptionsType>>;
}
const SingleAlbum = ({ filter, setFilter }: SingleAlbumProps) => {
  const { albumId } = useLocalSearchParams();

  // AlbumId should be a number as a string
  if (isNaN(+albumId) || Array.isArray(albumId)) {
    router.back();
    return;
  }

  const singleAlbumId = typeof albumId === "string" ? albumId : albumId[0];

  return (
    <View style={styles.container}>
      <ImageSet albumId={singleAlbumId} setFilter={setFilter} filter={filter} />
    </View>
  );
};

export default SingleAlbum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    gap: 30,
    paddingTop: 10,
  },
});
