import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { tokens } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";
import { SortOptions } from "@/server/types";

const copy = {
  heading: (filter: SortOptions) =>
    filter === SortOptions.DELETE
      ? "Great job cleaning up!"
      : "All sorted, nothing kept",
  copy: (filter: SortOptions) =>
    filter === SortOptions.DELETE
      ? "You've successfully deleted marked images!"
      : "Try sorting more images",
  cta: "Sort images",
};

type Props = {
  sortOption: SortOptions;
};

const Empty = ({ sortOption }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon_container}>
        <View style={styles.icon_group}>
          {sortOption === SortOptions.DELETE && (
            <MaterialIcons
              name="auto-awesome"
              size={64}
              color={tokens.color.blue}
            />
          )}
          <View style={styles.icon}>
            <AntDesign
              name="folderopen"
              size={144}
              color={tokens.color.grey6}
            />
          </View>
          {sortOption === SortOptions.DELETE && (
            <MaterialIcons
              name="auto-awesome"
              size={64}
              color={tokens.color.blue}
            />
          )}
        </View>
      </View>
      <View>
        <Text style={styles.heading}>{copy.heading(sortOption)}</Text>
        <Text style={styles.copy}>{copy.copy(sortOption)}</Text>
        <View style={styles.cta}>
          <Button variant="primary" size="$1" radius="$1">
            <Link href="/">
              <Button.Text>{copy.cta}</Button.Text>
            </Link>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: tokens.space[3],
  },
  icon_container: { justifyContent: "center", flex: 1 },
  icon_group: {
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: { paddingLeft: 20, paddingRight: 10 },
  heading: {
    fontSize: tokens.fontSize[2],
    fontWeight: "600",
    paddingVertical: tokens.space[2],
    color: tokens.color.grey7,
  },
  copy: {
    color: tokens.color.grey7,
  },
  cta: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingTop: tokens.space[4],
  },
});
