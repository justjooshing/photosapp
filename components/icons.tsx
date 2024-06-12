import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

import { SortOptions } from "@/api/types";
import { color } from "@/config/tamagui/tokens";

type Props = {
  choice: SortOptions;
  isSelected: boolean;
  size?: number;
};

const Icons = ({ choice, isSelected, size = 22 }: Props) => {
  const { name, color: inactiveColor } = {
    keep: {
      name: "folder1",
      color: color.green,
    } as const,
    delete: {
      name: "delete",
      color: color.red,
    } as const,
  }[choice];

  return (
    <AntDesign
      size={size}
      name={name}
      color={isSelected ? color.grey3 : inactiveColor}
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
