import { StyleSheet, Text, View } from "react-native";

import AlbumSet from "./album_set";

import { SortOptions } from "@/api/types";
import { tokens } from "@/config/tamagui/tokens";

const Albums = ({ sortOption }: { sortOption: SortOptions }) => {
  const tabCopy = {
    delete:
      "These image sets contain those that you've said you want to delete. Clean these up by deleting them from Google.",
    keep: "These image sets only contain images that you've decided you want to keep",
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.filter_text}>{tabCopy[sortOption]}</Text>
      <AlbumSet sortOption={sortOption} />
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
});
