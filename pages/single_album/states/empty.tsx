import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { tokens } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";
import {
  FilterOptionsType,
  useSingleAlbumContext,
} from "@/context/single_album";

const copy = {
  text: (filter: FilterOptionsType) =>
    `No images marked under ${filter}${filter === "all" ? "" : ", try setting to 'All'"}`,
  cta: (filter: FilterOptionsType) =>
    filter === "all" ? "Back to Albums" : "View All Images",
};

const Empty = () => {
  const { filter, setFilter } = useSingleAlbumContext();
  const handleEmptyClick = () => {
    if (filter !== "all") setFilter("all");
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <AntDesign name="folderopen" size={144} color={tokens.color.grey6} />
        <Text style={styles.copy}>{copy.text(filter)}</Text>
      </View>
      <View style={styles.cta}>
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
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: tokens.space[3],
  },
  copy: {
    color: tokens.color.grey7,
  },
  icon: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cta: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
