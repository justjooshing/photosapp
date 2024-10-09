import { StyleSheet, Text, View } from "react-native";

import Albums from "./albums";

import { SortOptions } from "@/server/types";
import { tokens } from "@/config/tamagui/tokens";

const AlbumsContainer = ({ sortOption }: { sortOption: SortOptions }) => {
  const tabCopy = {
    delete:
      "These image sets contain those that you've said you want to delete. Clean these up by deleting them from Google.",
    keep: "These image sets only contain images that you've decided you want to keep",
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.filter_text}>{tabCopy[sortOption]}</Text>
      <Albums sortOption={sortOption} />
    </View>
  );
};

export default AlbumsContainer;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    width: "100%",
    height: "100%",
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
