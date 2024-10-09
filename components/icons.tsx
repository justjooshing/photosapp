import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

import { tokens } from "@/config/tamagui/tokens";
import { SortOptions } from "@/server/types";

type Props = {
  choice: SortOptions;
  isSelected: boolean;
  size?: number;
};

const Icons = ({ choice, isSelected, size = 22 }: Props) => {
  const { name, color: inactiveColor } = {
    keep: {
      name: "folder1",
      color: tokens.color.green,
    } as const,
    delete: {
      name: "delete",
      color: tokens.color.red,
    } as const,
  }[choice];

  return (
    <AntDesign
      size={size}
      name={name}
      color={isSelected ? tokens.color.grey3 : inactiveColor}
      style={styles.icon}
    />
  );
};

export default Icons;

const styles = StyleSheet.create({
  icon: {
    padding: 5,
    userSelect: "none",
  },
});
