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
  const { albumId } = useLocalSearchParams<{ albumId: string }>();

  // AlbumId should be a number as a string
  if (isNaN(+albumId)) {
    router.back();
    return;
  }

  return (
    <View style={styles.container}>
      <ImageSet albumId={albumId} setFilter={setFilter} filter={filter} />
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
