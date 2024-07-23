import { StyleSheet, View } from "react-native";

import AlbumsList from "./components/albums_list";

const Albums = () => {
  return (
    <View style={styles.wrapper}>
      <AlbumsList />
    </View>
  );
};

export default Albums;

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    flex: 1,
    width: "100%",
    minHeight: "100%",
  },
});
