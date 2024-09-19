import { StyleSheet, View } from "react-native";

import SingleAlbum from "./single_album";

import { FilterOptionsType, SingleAlbumProvider } from "@/context/single_album";

const SingleAlbumContainer = ({ filter }: { filter: FilterOptionsType }) => (
  <SingleAlbumProvider initialState={{ filter }}>
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
