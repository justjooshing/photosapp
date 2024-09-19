import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";

import SingleAlbum from "./single_album";

import { FilterOptionsType, SingleAlbumProvider } from "@/context/single_album";

interface SingleAlbumContainerProps {
  filter: FilterOptionsType;
  setFilter: Dispatch<SetStateAction<SingleAlbumContainerProps["filter"]>>;
}
const SingleAlbumContainer = ({
  filter,
  setFilter,
}: SingleAlbumContainerProps) => (
  // Wrapping here rather than _tabs because filter needs to be set statically for each tab
  <SingleAlbumProvider initialState={{ filter, setFilter }}>
    <View style={styles.container}>
      <SingleAlbum />
    </View>
  </SingleAlbumProvider>
);

export default SingleAlbumContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    gap: 30,
    paddingTop: 10,
  },
});
