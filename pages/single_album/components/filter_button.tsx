import React, { Dispatch, SetStateAction } from "react";
import { Pressable } from "react-native";

import { FilterOptions } from "../types";

import { SortOptions } from "@/api/types";
import Icons from "@/components/icons";

type Props = {
  choice: SortOptions;
  filter: FilterOptions;
  setFilter: Dispatch<SetStateAction<FilterOptions>>;
};

const Button = ({ choice, setFilter, filter }: Props) => (
  <Pressable onPress={() => setFilter(choice)} disabled={filter === choice}>
    <Icons choice={choice} isSelected={filter === choice} size={16} />
  </Pressable>
);

export default Button;
